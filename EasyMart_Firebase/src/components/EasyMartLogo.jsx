import React from 'react';

export default function EasyMartLogo({ size = 50 }) {
  return (
    <svg role="img"width={size * 3.8} height={size} viewBox="0 0 190 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
      <rect width="220" height="50" rx="12" fill="#FF9900"/>
      <text x="55" y="35" fontFamily="Montserrat, Arial, sans-serif" fontSize="28" fontWeight="700" fill="#fff">EasyMart</text>
      <g>
        <circle cx="32" cy="25" r="13" fill="#fff"/>
        <rect x="19" y="20" width="26" height="8" rx="4" fill="#232f3e"/>
        <circle cx="25" cy="36" r="3" fill="#FF9900"/>
        <circle cx="39" cy="36" r="3" fill="#FF9900"/>
        <rect x="27" y="23" width="10" height="4" rx="2" fill="#FF9900"/>
      </g>
    </svg>
  );
}