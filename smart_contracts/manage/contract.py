from pyteal import *

class ConsentManager:
    class Variables:
        consent_id = Bytes("consent_id")
        owner = Bytes("owner")
        recipient = Bytes("recipient")
        expiry = Bytes("expiry")
        scope = Bytes("scope")
        status = Bytes("status")
        metadata = Bytes("metadata")

    class AppMethods:
        grant_consent = Bytes("grant_consent")
        revoke_consent = Bytes("revoke_consent")
        update_consent = Bytes("update_consent")
        verify_consent = Bytes("verify_consent")

    def application_creation(self):
        return Seq([
            App.globalPut(self.Variables.owner, Txn.sender()),
            App.globalPut(self.Variables.status, Bytes("active")),
            Return(Int(1))
        ])

    def grant_consent(self):
        recipient = Txn.accounts[1]
        expiry = Btoi(Txn.application_args[1])
        scope = Txn.application_args[2]
        metadata = Txn.application_args[3]

        return Seq([
            Assert(Txn.sender() == App.globalGet(self.Variables.owner)),
            Assert(Global.latest_timestamp() < expiry),
            App.globalPut(self.Variables.recipient, recipient),
            App.globalPut(self.Variables.expiry, expiry),
            App.globalPut(self.Variables.scope, scope),
            App.globalPut(self.Variables.metadata, metadata),
            App.globalPut(self.Variables.status, Bytes("granted")),
            Return(Int(1))
        ])

    def revoke_consent(self):
        return Seq([
            Assert(Or(
                Txn.sender() == App.globalGet(self.Variables.owner),
                Txn.sender() == App.globalGet(self.Variables.recipient)
            )),
            App.globalPut(self.Variables.status, Bytes("revoked")),
            Return(Int(1))
        ])

    def update_consent(self):
        new_expiry = Btoi(Txn.application_args[1])
        new_scope = Txn.application_args[2]
        new_metadata = Txn.application_args[3]

        return Seq([
            Assert(Txn.sender() == App.globalGet(self.Variables.owner)),
            Assert(Global.latest_timestamp() < new_expiry),
            App.globalPut(self.Variables.expiry, new_expiry),
            App.globalPut(self.Variables.scope, new_scope),
            App.globalPut(self.Variables.metadata, new_metadata),
            Return(Int(1))
        ])

    def verify_consent(self):
        return Seq([
            Assert(Txn.sender() == App.globalGet(self.Variables.recipient)),
            Assert(App.globalGet(self.Variables.status) == Bytes("granted")),
            Assert(Global.latest_timestamp() < App.globalGet(self.Variables.expiry)),
            Return(Int(1))
        ])

    def application_start(self):
        return Cond(
            [Txn.application_id() == Int(0), self.application_creation()],
            [Txn.on_completion() == OnComplete.DeleteApplication, Return(Int(0))],
            [Txn.on_completion() == OnComplete.UpdateApplication, Return(Int(0))],
            [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
            [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
            [Txn.application_args[0] == self.AppMethods.grant_consent, self.grant_consent()],
            [Txn.application_args[0] == self.AppMethods.revoke_consent, self.revoke_consent()],
            [Txn.application_args[0] == self.AppMethods.update_consent, self.update_consent()],
            [Txn.application_args[0] == self.AppMethods.verify_consent, self.verify_consent()]
        )

    def approval_program(self):
        return self.application_start()

    def clear_program(self):
        return Return(Int(1))

def get_approval_program():
    return ConsentManager().approval_program()

def get_clear_program():
    return ConsentManager().clear_program()

if __name__ == "__main__":
    with open("approval.teal", "w") as f:
        compiled = compileTeal(get_approval_program(), mode=Mode.Application, version=6)
        f.write(compiled)

    with open("clear.teal", "w") as f:
        compiled = compileTeal(get_clear_program(), mode=Mode.Application, version=6)
        f.write(compiled) 