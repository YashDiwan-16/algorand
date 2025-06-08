from pyteal import *

def approval_program():
    # Global state keys
    owner = Bytes("owner")
    document_hash = Bytes("document_hash")
    document_type = Bytes("document_type")
    request_id = Bytes("request_id")
    requester = Bytes("requester")
    status = Bytes("status")  # "pending", "granted", "revoked"
    expiry = Bytes("expiry")
    permissions = Bytes("permissions")

    # Operations
    request_consent = Bytes("request_consent")
    grant_consent = Bytes("grant_consent")
    revoke_consent = Bytes("revoke_consent")
    view_document = Bytes("view_document")

    # Helper functions
    def is_owner():
        return Txn.sender() == App.globalGet(owner)

    def is_requester():
        return Txn.sender() == App.globalGet(requester)

    def is_granted():
        return App.globalGet(status) == Bytes("granted")

    def is_not_expired():
        return App.globalGet(expiry) > Global.latest_timestamp()

    # Request consent operation
    def handle_request_consent():
        return Seq([
            Assert(Txn.application_args[1] != Bytes("")),  # document_hash
            Assert(Txn.application_args[2] != Bytes("")),  # document_type
            Assert(Txn.application_args[3] != Bytes("")),  # request_id
            Assert(Txn.application_args[4] != Bytes("")),  # requester
            App.globalPut(document_hash, Txn.application_args[1]),
            App.globalPut(document_type, Txn.application_args[2]),
            App.globalPut(request_id, Txn.application_args[3]),
            App.globalPut(requester, Txn.application_args[4]),
            App.globalPut(status, Bytes("pending")),
            Return(Int(1))
        ])

    # Grant consent operation
    def handle_grant_consent():
        return Seq([
            Assert(is_owner()),
            Assert(App.globalGet(status) == Bytes("pending")),
            Assert(Txn.application_args[1] != Bytes("")),  # expiry
            Assert(Txn.application_args[2] != Bytes("")),  # permissions
            App.globalPut(status, Bytes("granted")),
            App.globalPut(expiry, Btoi(Txn.application_args[1])),
            App.globalPut(permissions, Txn.application_args[2]),
            Return(Int(1))
        ])

    # Revoke consent operation
    def handle_revoke_consent():
        return Seq([
            Assert(Or(is_owner(), is_requester())),
            Assert(is_granted()),
            App.globalPut(status, Bytes("revoked")),
            Return(Int(1))
        ])

    # View document operation
    def handle_view_document():
        return Seq([
            Assert(is_granted()),
            Assert(is_not_expired()),
            Assert(Or(is_owner(), is_requester())),
            Return(Int(1))
        ])

    # Main program
    program = Cond(
        [Txn.application_id() == Int(0), Return(Int(1))],  # Creation
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(is_owner())],
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(is_owner())],
        [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
        [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
        [Txn.application_args[0] == request_consent, handle_request_consent()],
        [Txn.application_args[0] == grant_consent, handle_grant_consent()],
        [Txn.application_args[0] == revoke_consent, handle_revoke_consent()],
        [Txn.application_args[0] == view_document, handle_view_document()]
    )

    return program

def clear_state_program():
    return Return(Int(1))

if __name__ == "__main__":
    with open("consent_approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=6)
        f.write(compiled)

    with open("consent_clear.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=6)
        f.write(compiled) 