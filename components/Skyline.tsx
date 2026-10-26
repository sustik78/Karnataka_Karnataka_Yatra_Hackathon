export function Skyline({ idPrefix = "skyline" }: { idPrefix?: string }) {
  const goldId = `${idPrefix}-gold`;
  const fillId = `${idPrefix}-fill`;
  const coralId = `${idPrefix}-coral`;
  const moonId = `${idPrefix}-moon`;

  return (
    <svg
      viewBox="0 0 1200 220"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5B301" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#F5B301" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF7A59" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5B301" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8B1E3F" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={coralId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF7A59" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FF9B80" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F5B301" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id={moonId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3C4" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#F5B301" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5B301" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="950" cy="58" r="76" fill={`url(#${moonId})`} />
      <circle cx="950" cy="58" r="24" fill="#F5B301" fillOpacity="0.26" stroke="#FFE7A0" strokeOpacity="0.55" />

      <path
        d="M0 176C92 145 170 159 249 137C331 114 388 150 462 128C540 105 585 138 662 131C735 124 782 91 858 111C942 133 1000 105 1081 124C1127 135 1163 130 1200 119V220H0Z"
        fill={`url(#${fillId})`}
      />
      <path
        d="M0 186C78 162 157 181 237 156C320 130 377 174 467 153C546 135 604 166 694 157C781 148 831 120 908 143C985 166 1050 143 1126 154C1155 159 1178 158 1200 152"
        fill="none"
        stroke={`url(#${goldId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="3 8"
        opacity="0.55"
      />

      <g fill="none" stroke={`url(#${goldId})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M148 192V133H361V192" />
        <path d="M130 192H378" />
        <path d="M147 151H361" />
        <path d="M181 133V116M199 133V116M219 133V116M241 133V116M263 133V116M285 133V116M307 133V116M327 133V116" />
        <path d="M196 192V164C196 155 203 148 212 148H230C239 148 246 155 246 164V192" />
        <path d="M211 148V136C211 129 217 123 224 123C231 123 237 129 237 136V148" />
        <path d="M257 192V166H310V192" />
        <path d="M270 166V153C270 147 275 142 281 142C287 142 292 147 292 153V166" />
        <path d="M281 142V132" />
        <path d="M166 166H180V176H166Z" />
        <path d="M330 162H344V176H330Z" />
        <path d="M148 133C167 116 190 107 210 108" strokeOpacity="0.5" />
        <path d="M361 133C342 116 319 107 299 108" strokeOpacity="0.5" />
      </g>

      <g fill="none" stroke={`url(#${coralId})`} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M590 192V86C590 76 596 70 604 70H660C668 70 674 76 674 86V192" />
        <path d="M578 192H686" />
        <path d="M587 86H677" />
        <path d="M604 70L610 52L617 70M625 70L632 46L639 70M647 70L654 52L660 70" />
        <path d="M604 52V34M632 46V24M660 52V34" />
        <path d="M632 24L626 30H638Z" />
        <path d="M590 105H674M590 128H674M590 151H674M590 174H674" strokeOpacity="0.48" />
        <path d="M608 192V156H656V192" />
        <path d="M621 156V136C621 128 626 122 632 122C638 122 643 128 643 136V156" />
        <path d="M632 122V112" />
        <path d="M590 105L604 95M674 105L660 95" strokeOpacity="0.6" />
        <path d="M582 192C582 180 588 172 599 172M682 192C682 180 676 172 665 172" strokeOpacity="0.4" />
      </g>

      <g fill="none" stroke={`url(#${goldId})`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <path d="M788 192V153H927V192" />
        <path d="M776 192H940" />
        <path d="M788 153H927" />
        <path d="M812 153V141M838 153V141M864 153V141M890 153V141" />
        <path d="M798 192V171H817V192M900 192V168H919V192" />
        <path d="M845 192V164C845 157 851 151 858 151C865 151 871 157 871 164V192" />
        <path d="M858 151V143" />
        <path d="M776 192C764 192 756 200 746 200" strokeOpacity="0.45" />
        <path d="M940 192C952 192 962 198 972 198" strokeOpacity="0.45" />
      </g>

      <g fill="none" stroke={`url(#${coralId})`} strokeWidth="1.3" strokeLinecap="round" opacity="0.8">
        <path d="M1012 192V157H1082V192" />
        <path d="M1000 192H1094" />
        <path d="M1012 157H1082" />
        <path d="M1028 157L1034 142L1040 157M1054 157L1060 142L1066 157" />
        <path d="M1034 142V133M1060 142V133" />
        <path d="M1036 192V174C1036 168 1040 164 1046 164C1052 164 1056 168 1056 174V192" />
      </g>

      <g fill="none" stroke="#F5B301" strokeOpacity="0.58" strokeWidth="1.3" strokeLinecap="round">
        <path d="M432 55C447 48 462 48 478 54" />
        <path d="M442 64C452 60 463 60 473 64" />
        <path d="M510 72C522 66 534 66 546 71" />
        <path d="M520 80C528 77 536 77 544 80" />
        <path d="M1084 82C1095 76 1107 76 1118 81" />
        <path d="M1092 90C1100 87 1109 87 1117 90" />
      </g>

      <g fill="#F5B301" fillOpacity="0.7">
        <circle cx="432" cy="51" r="2" />
        <circle cx="482" cy="56" r="1.5" />
        <circle cx="510" cy="68" r="1.8" />
        <circle cx="552" cy="72" r="1.4" />
        <circle cx="1084" cy="78" r="1.5" />
        <circle cx="1124" cy="82" r="1.2" />
        <circle cx="1132" cy="46" r="1.7" />
        <circle cx="160" cy="80" r="1.4" />
        <circle cx="120" cy="110" r="1.2" />
      </g>

      <path
        d="M0 220C55 193 122 203 188 191C255 179 289 193 354 190C428 186 473 201 542 196C618 191 671 210 753 204C824 199 882 180 954 190C1021 199 1081 183 1141 189C1164 191 1183 194 1200 198V220Z"
        fill="#0b0b1a"
        fillOpacity="0.38"
      />
    </svg>
  );
}
