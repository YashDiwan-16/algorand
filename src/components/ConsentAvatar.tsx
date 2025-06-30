import React from "react";

interface ConsentAvatarProps {
  name: string;
  image?: string;
}

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase();

const ConsentAvatar: React.FC<ConsentAvatarProps> = ({ name, image }) => (
  image ? (
    <img src={image} alt={name} className="w-8 h-8 rounded-full object-cover" />
  ) : (
    <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
      {getInitials(name)}
    </span>
  )
);

export default ConsentAvatar; 