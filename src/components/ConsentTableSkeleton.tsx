import React from "react";

const ConsentTableSkeleton: React.FC = () => (
  <table className="w-full animate-pulse">
    <tbody>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="h-10">
          <td className="bg-gray-200 rounded" colSpan={5}></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ConsentTableSkeleton; 