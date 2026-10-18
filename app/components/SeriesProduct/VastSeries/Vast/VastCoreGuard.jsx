import { useEffect, useLayoutEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const CoreGuardChart = () => {
  const uid = `coreguard-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg className="vast-core-guard__chart-svg" viewBox="0 0 453 260" fill="none" role="img" aria-label="Flavor comparison between VAST and other devices over 105K puffs">
      <path d="M20.7586 18.5186C20.4928 18.2528 20.0619 18.2528 19.796 18.5186L15.4645 22.8502C15.1987 23.116 15.1987 23.547 15.4645 23.8128C15.7303 24.0786 16.1613 24.0786 16.4271 23.8128L20.2773 19.9625L24.1276 23.8128C24.3934 24.0786 24.8244 24.0786 25.0902 23.8128C25.356 23.547 25.356 23.116 25.0902 22.8502L20.7586 18.5186ZM20.2773 242.96L20.958 242.96L20.958 18.9999L20.2773 18.9999L19.5967 18.9999L19.5967 242.96L20.2773 242.96Z" fill="white" />
      <path d="M415.666 243.136C415.932 242.87 415.932 242.439 415.666 242.173L411.334 237.841C411.069 237.576 410.638 237.576 410.372 237.841C410.106 238.107 410.106 238.538 410.372 238.804L414.222 242.654L410.372 246.505C410.106 246.77 410.106 247.201 410.372 247.467C410.638 247.733 411.069 247.733 411.334 247.467L415.666 243.136ZM20 242.654V243.335H415.185V242.654V241.974H20V242.654Z" fill="white" />
      <mask id={`${uid}-mask0_4660_620`} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="20" y="35" width="382" height="207">
        <rect x="20.7734" y="35.1753" width="380.73" height="206.541" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#${uid}-mask0_4660_620)`}>
        <g clipPath={`url(#${uid}-fill-reveal)`}>
          <path d="M144.265 42.8454H18.5586V242.702H411.016C408.016 209 412.016 125.5 412.016 125.5C412.016 125.5 385.5 74.1755 327 58.5008C268.5 42.8261 186.368 41.8216 144.265 42.8454Z" fill={`url(#${uid}-paint0_linear_4660_620)`} />
          <path d="M227.498 133C174.998 90.5005 115.498 75.73 17.3945 75.73V242.802H306.998C297.998 214.5 279.998 175.5 227.498 133Z" fill={`url(#${uid}-paint1_linear_4660_620)`} />
        </g>
        <path d="M18.5586 42.8454H144.265C186.368 41.8216 268.5 42.8261 327 58.5008C385.5 74.1755 412.016 125.5 412.016 125.5" fill="none" stroke="#F26015" strokeWidth="1.36128" mask={`url(#${uid}-draw-0)`} />
        <path d="M17.3945 75.73C115.498 75.73 174.998 90.5005 227.498 133C279.998 175.5 297.998 214.5 306.998 242.802" fill="none" stroke={`url(#${uid}-paint2_linear_4660_620)`} strokeWidth="1.24423" mask={`url(#${uid}-draw-1)`} strokeDasharray="9.53 9.53" />
      </g>
      <path d="M33.638 52.2023H35.598L37.936 59.1603L40.288 52.2023H42.248L38.664 61.8623H37.194L33.638 52.2023ZM48.3571 59.9863H44.2551L43.5551 61.8623H41.5951L45.5571 52.2023H47.0551L51.0171 61.8623H49.0571L48.3571 59.9863ZM47.7831 58.4603L46.2991 54.5263L44.8291 58.4603H47.7831ZM52.5384 61.1763C51.8944 60.6583 51.5304 59.9023 51.4604 58.9223H53.2104C53.2664 59.4403 53.4764 59.8183 53.8264 60.0423C54.1764 60.2663 54.6944 60.3783 55.3664 60.3783C56.6824 60.3783 57.3404 59.9443 57.3404 59.0763C57.3404 58.6983 57.2004 58.4043 56.9484 58.2083C56.6824 58.0123 56.2484 57.8723 55.6604 57.8023L54.6384 57.6763C52.6784 57.4383 51.6984 56.5423 51.6984 54.9743C51.6984 54.0783 52.0204 53.3643 52.6784 52.8463C53.3224 52.3283 54.2184 52.0623 55.3524 52.0623C56.4444 52.0623 57.2984 52.3143 57.9144 52.8043C58.5304 53.3083 58.8664 54.0223 58.9504 54.9463H57.1864C57.1444 54.4843 56.9764 54.1483 56.6684 53.9243C56.3604 53.7143 55.9124 53.6023 55.3104 53.6023C54.6944 53.6023 54.2464 53.7143 53.9384 53.9243C53.6304 54.1483 53.4764 54.4423 53.4764 54.8343C53.4764 55.1983 53.6024 55.4643 53.8824 55.6603C54.1484 55.8563 54.5824 55.9963 55.1844 56.0663L56.3464 56.2203C57.2564 56.3463 57.9564 56.6403 58.4324 57.0883C58.9084 57.5363 59.1464 58.1523 59.1464 58.9363C59.1464 59.9163 58.7964 60.6583 58.1104 61.1763C57.4104 61.6943 56.4724 61.9463 55.2684 61.9463C54.0924 61.9463 53.1824 61.6943 52.5384 61.1763ZM67.2999 53.7983H64.4019V61.8623H62.5679V53.7983H59.6699V52.2023H67.2999V53.7983Z" fill="#B13C00" />
      <path d="M35.402 95.7897C34.702 95.0897 34.352 94.0257 34.352 92.6117V91.0997C34.352 89.6997 34.702 88.6357 35.416 87.9217C36.13 87.2217 37.124 86.8577 38.384 86.8577C39.616 86.8577 40.596 87.2217 41.31 87.9217C42.01 88.6357 42.374 89.6997 42.374 91.0997V92.6117C42.374 94.0117 42.01 95.0757 41.282 95.7897C40.554 96.5037 39.574 96.8537 38.328 96.8537C37.068 96.8537 36.102 96.5037 35.402 95.7897ZM40.54 92.5837V91.1977C40.54 89.3777 39.812 88.4677 38.384 88.4677C37.642 88.4677 37.096 88.6917 36.732 89.1397C36.368 89.5877 36.2 90.2737 36.2 91.1977V92.5837C36.2 93.4797 36.368 94.1377 36.732 94.5577C37.096 94.9917 37.642 95.2017 38.384 95.2017C39.812 95.2017 40.54 94.3337 40.54 92.5837ZM46.348 90.6377V94.3477C46.348 94.6697 46.404 94.8937 46.544 95.0337C46.684 95.1737 46.908 95.2297 47.23 95.2297H47.846V96.6997H46.908C46.166 96.6997 45.606 96.5177 45.214 96.1257C44.822 95.7337 44.626 95.1877 44.626 94.4597V90.6377H43.352V89.4197H44.626V87.9917L46.348 87.3897V89.4197H48V90.6377H46.348ZM49.2814 87.0397H51.0174V90.1897C51.2694 89.9097 51.5774 89.6997 51.9414 89.5597C52.3054 89.4197 52.6974 89.3357 53.1174 89.3357C53.9574 89.3357 54.6014 89.5877 55.0774 90.0777C55.5394 90.5817 55.7774 91.2677 55.7774 92.1637V96.6997H54.0414V92.5137C54.0414 91.4217 53.5514 90.8757 52.5994 90.8757C52.0954 90.8757 51.7174 91.0297 51.4374 91.3097C51.1574 91.5897 51.0174 92.0237 51.0174 92.5837V96.6997H49.2814V87.0397ZM58.9031 93.5357V93.5637C58.9031 94.7397 59.4911 95.3137 60.6951 95.3137C61.0871 95.3137 61.4231 95.2437 61.6751 95.0897C61.9271 94.9497 62.0811 94.7397 62.1231 94.4597L62.1371 94.4177H63.8311V94.5017C63.7751 95.2017 63.4671 95.7757 62.8931 96.1957C62.3191 96.6157 61.5631 96.8257 60.6251 96.8257C59.5471 96.8257 58.7071 96.5317 58.0911 95.9437C57.4751 95.3557 57.1811 94.5017 57.1811 93.3677V92.7377C57.1811 91.6317 57.4751 90.7777 58.0771 90.1897C58.6651 89.6017 59.4911 89.2937 60.5411 89.2937C61.5771 89.2937 62.4031 89.5877 63.0051 90.1757C63.5931 90.7637 63.9011 91.6037 63.9011 92.6957V93.5357H58.9031ZM58.9031 92.3457H62.1651V92.2477C62.1651 91.7717 62.0111 91.4077 61.7171 91.1557C61.4231 90.9037 61.0311 90.7777 60.5411 90.7777C59.5051 90.7777 58.9591 91.3097 58.9031 92.3457ZM65.2912 89.4197H66.9852V90.2457C67.2232 89.9237 67.5312 89.6857 67.8952 89.5177C68.2592 89.3497 68.6652 89.2657 69.1132 89.2657C69.3792 89.2657 69.6032 89.2937 69.7992 89.3217V90.9737C69.4772 90.8617 69.1272 90.7917 68.7632 90.7917C68.2032 90.7917 67.7832 90.9597 67.4752 91.2817C67.1672 91.6037 67.0272 92.0657 67.0272 92.6677V96.6997H65.2912V89.4197Z" fill="#707070" />
      <path d="M3.587 4.083V6.956H7.955V8.009H3.587V12H2.404V3.03H8.67V4.083H3.587ZM10.501 11.519C10.163 11.194 10.007 10.687 10.007 9.998V3.03H11.112V9.933C11.112 10.323 11.19 10.609 11.346 10.765C11.502 10.934 11.788 11.012 12.191 11.012H12.763V12H12.048C11.346 12 10.839 11.844 10.501 11.519ZM18.5838 5.877C19.0778 6.293 19.3248 6.878 19.3248 7.658V12H18.2458V11.246C17.7778 11.805 17.0628 12.078 16.0748 12.078C15.2688 12.078 14.6448 11.909 14.2288 11.571C13.8128 11.233 13.6048 10.726 13.6048 10.076C13.6048 9.452 13.8128 8.984 14.2548 8.646C14.6838 8.308 15.3208 8.139 16.1528 8.139H18.2198V7.684C18.2198 6.683 17.6348 6.176 16.4648 6.176C15.9448 6.176 15.5548 6.28 15.2948 6.462C15.0348 6.657 14.9048 6.93 14.9048 7.268V7.307H13.8258V7.268C13.8258 6.644 14.0598 6.163 14.5278 5.799C14.9958 5.435 15.6328 5.253 16.4518 5.253C17.3748 5.253 18.0898 5.461 18.5838 5.877ZM17.7518 10.765C18.0638 10.492 18.2198 10.063 18.2198 9.491V8.971H16.3348C15.7628 8.971 15.3468 9.062 15.0868 9.244C14.8268 9.426 14.6968 9.699 14.6968 10.063C14.6968 10.453 14.8268 10.726 15.0868 10.908C15.3468 11.09 15.7498 11.181 16.2958 11.181C16.9458 11.181 17.4398 11.051 17.7518 10.765ZM20.2991 5.344H21.4821L23.4711 10.622L25.4471 5.344H26.6301L24.0041 12H22.9251L20.2991 5.344ZM28.201 11.324C27.655 10.791 27.395 10.011 27.395 8.997V8.334C27.395 7.32 27.655 6.553 28.201 6.02C28.747 5.487 29.488 5.214 30.45 5.214C31.386 5.214 32.127 5.487 32.673 6.02C33.206 6.566 33.479 7.333 33.479 8.334V8.997C33.479 10.011 33.206 10.791 32.673 11.324C32.127 11.857 31.386 12.117 30.45 12.117C29.488 12.117 28.747 11.857 28.201 11.324ZM32.374 8.971V8.36C32.374 6.93 31.724 6.202 30.437 6.202C29.137 6.202 28.5 6.93 28.5 8.36V8.971C28.5 10.427 29.137 11.142 30.437 11.142C31.724 11.142 32.374 10.427 32.374 8.971ZM35.0294 5.344H36.1214V6.28C36.3424 5.942 36.6414 5.682 37.0054 5.513C37.3694 5.344 37.7724 5.253 38.2404 5.253C38.4224 5.253 38.6044 5.266 38.7734 5.292V6.345C38.5394 6.28 38.2924 6.241 38.0454 6.241C37.4734 6.241 37.0054 6.423 36.6544 6.761C36.3034 7.112 36.1344 7.58 36.1344 8.165V12H35.0294V5.344Z" fill="white" />
      <path d="M20.9276 256.992C20.4596 256.446 20.2256 255.627 20.2256 254.535V251.792C20.2256 250.739 20.4596 249.946 20.9276 249.4C21.3956 248.854 22.0846 248.581 23.0076 248.581C23.9176 248.581 24.6196 248.854 25.0876 249.4C25.5556 249.946 25.8026 250.739 25.8026 251.792V254.535C25.8026 255.627 25.5556 256.446 25.0876 256.992C24.6196 257.538 23.9176 257.811 23.0076 257.811C22.0846 257.811 21.3956 257.538 20.9276 256.992ZM24.2426 256.212C24.4896 255.848 24.6196 255.25 24.6196 254.444V251.948C24.6196 251.142 24.4896 250.557 24.2296 250.193C23.9696 249.829 23.5666 249.634 23.0076 249.634C22.4486 249.634 22.0456 249.829 21.7856 250.193C21.5256 250.557 21.4086 251.142 21.4086 251.948V254.444C21.4086 255.25 21.5256 255.848 21.7856 256.212C22.0456 256.576 22.4486 256.758 23.0076 256.758C23.5796 256.758 23.9826 256.576 24.2426 256.212Z" fill="white" />
      <path d="M381.747 249.998L379.836 251.194V249.933L381.747 248.711H382.93V257.681H381.747V249.998ZM385.456 256.992C384.988 256.446 384.754 255.627 384.754 254.535V251.792C384.754 250.739 384.988 249.946 385.456 249.4C385.924 248.854 386.613 248.581 387.536 248.581C388.446 248.581 389.148 248.854 389.616 249.4C390.084 249.946 390.331 250.739 390.331 251.792V254.535C390.331 255.627 390.084 256.446 389.616 256.992C389.148 257.538 388.446 257.811 387.536 257.811C386.613 257.811 385.924 257.538 385.456 256.992ZM388.771 256.212C389.018 255.848 389.148 255.25 389.148 254.444V251.948C389.148 251.142 389.018 250.557 388.758 250.193C388.498 249.829 388.095 249.634 387.536 249.634C386.977 249.634 386.574 249.829 386.314 250.193C386.054 250.557 385.937 251.142 385.937 251.948V254.444C385.937 255.25 386.054 255.848 386.314 256.212C386.574 256.576 386.977 256.758 387.536 256.758C388.108 256.758 388.511 256.576 388.771 256.212ZM392.578 257.174C392.11 256.758 391.889 256.212 391.889 255.536V255.432H393.02V255.497C393.02 255.861 393.15 256.173 393.41 256.407C393.67 256.654 394.047 256.771 394.554 256.771C395.594 256.771 396.127 256.186 396.127 255.016V254.561C396.127 253.989 395.997 253.547 395.737 253.248C395.477 252.949 395.087 252.793 394.593 252.793C394.255 252.793 393.956 252.871 393.722 253.027C393.475 253.183 393.293 253.391 393.176 253.677H392.032V248.711H397.05V249.764H393.085V252.416C393.28 252.221 393.527 252.065 393.839 251.948C394.138 251.831 394.463 251.766 394.801 251.766C395.581 251.766 396.192 252.013 396.634 252.481C397.076 252.962 397.297 253.638 397.297 254.509V255.068C397.297 255.939 397.05 256.615 396.569 257.096C396.075 257.577 395.399 257.811 394.528 257.811C393.683 257.811 393.033 257.603 392.578 257.174ZM402.213 253.066L400.185 255.224V257.681H399.002V248.711H400.185V253.729L404.8 248.711H406.282L402.993 252.234L406.698 257.681H405.281L402.213 253.066Z" fill="white" />
      <path d="M427.583 238.718C428.103 239.173 428.376 239.836 428.376 240.72C428.376 241.591 428.103 242.254 427.583 242.709C427.063 243.177 426.296 243.398 425.295 243.398H422.591V246.999H421.408V238.029H425.295C426.283 238.029 427.05 238.263 427.583 238.718ZM426.738 241.968C427.037 241.708 427.193 241.305 427.193 240.733C427.193 240.148 427.037 239.732 426.725 239.472C426.413 239.212 425.919 239.082 425.243 239.082H422.591V242.345H425.321C425.958 242.345 426.426 242.228 426.738 241.968ZM430.349 246.388C429.855 245.92 429.621 245.244 429.621 244.36V240.343H430.726V244.243C430.726 245.491 431.298 246.102 432.468 246.102C433.066 246.102 433.495 245.959 433.781 245.647C434.067 245.335 434.21 244.867 434.21 244.243V240.343H435.315V244.36C435.315 245.244 435.068 245.92 434.574 246.388C434.08 246.856 433.378 247.09 432.455 247.09C431.532 247.09 430.83 246.856 430.349 246.388ZM439.037 239.095C438.868 239.251 438.79 239.498 438.79 239.836V240.343H440.454V241.175H438.79V246.999H437.685V241.175H436.749V240.343H437.685V239.875C437.685 239.277 437.854 238.822 438.192 238.51C438.53 238.198 439.011 238.029 439.661 238.029H440.454V238.848H439.843C439.479 238.848 439.206 238.939 439.037 239.095ZM443.95 239.095C443.781 239.251 443.703 239.498 443.703 239.836V240.343H445.367V241.175H443.703V246.999H442.598V241.175H441.662V240.343H442.598V239.875C442.598 239.277 442.767 238.822 443.105 238.51C443.443 238.198 443.924 238.029 444.574 238.029H445.367V238.848H444.756C444.392 238.848 444.119 238.939 443.95 239.095ZM447.099 246.531C446.605 246.167 446.358 245.66 446.358 245.01V244.971H447.411V244.997C447.411 245.361 447.554 245.634 447.853 245.842C448.139 246.05 448.594 246.154 449.218 246.154C449.764 246.154 450.206 246.063 450.518 245.881C450.83 245.699 450.999 245.439 450.999 245.088C450.999 244.802 450.882 244.594 450.648 244.438C450.414 244.295 450.05 244.191 449.556 244.139L448.607 244.022C447.866 243.944 447.32 243.749 446.982 243.463C446.631 243.177 446.462 242.761 446.462 242.228C446.462 241.617 446.696 241.136 447.19 240.785C447.671 240.434 448.334 240.252 449.166 240.252C450.024 240.252 450.713 240.434 451.207 240.785C451.701 241.149 451.948 241.63 451.948 242.228V242.28H450.895V242.241C450.895 241.89 450.739 241.617 450.44 241.435C450.141 241.253 449.725 241.149 449.179 241.149C448.62 241.149 448.204 241.24 447.931 241.409C447.645 241.591 447.515 241.838 447.515 242.15C447.515 242.436 447.606 242.644 447.814 242.787C448.009 242.93 448.347 243.021 448.841 243.073L449.855 243.203C450.596 243.294 451.142 243.489 451.506 243.775C451.87 244.074 452.052 244.49 452.052 245.023C452.052 245.673 451.792 246.18 451.272 246.544C450.752 246.908 450.05 247.077 449.166 247.077C448.282 247.077 447.593 246.895 447.099 246.531Z" fill="white" />
      <line x1="402.759" y1="235.309" x2="402.759" y2="242.891" stroke="white" strokeWidth="1.36128" />
      <defs >
        <linearGradient id={`${uid}-paint0_linear_4660_620`} x1="218.041" y1="42.501" x2="219.243" y2="242.702" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB6E" />
          <stop offset="1" stopColor="#FFD561" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-paint1_linear_4660_620`} x1="212.601" y1="74.6978" x2="212.601" y2="242.801" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C3C3C3" />
          <stop offset="1" stopColor="#C3C3C3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-paint2_linear_4660_620`} x1="162.196" y1="75.73" x2="162.196" y2="242.802" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DADADA" />
          <stop offset="1" stopColor="#858585" />
        </linearGradient>
        <clipPath id={`${uid}-fill-reveal`} clipPathUnits="userSpaceOnUse">
          <rect x="18" y="35" width="394" height="209" data-chart-reveal="" />
        </clipPath>
        <mask id={`${uid}-draw-0`} maskUnits="userSpaceOnUse" x="10" y="30" width="410" height="220">
          <path d="M18.5586 42.8454H144.265C186.368 41.8216 268.5 42.8261 327 58.5008C385.5 74.1755 412.016 125.5 412.016 125.5" fill="none" stroke="white" strokeWidth="6" data-chart-draw="" />
        </mask>
        <mask id={`${uid}-draw-1`} maskUnits="userSpaceOnUse" x="10" y="30" width="410" height="220">
          <path d="M17.3945 75.73C115.498 75.73 174.998 90.5005 227.498 133C279.998 175.5 297.998 214.5 306.998 242.802" fill="none" stroke="white" strokeWidth="6" data-chart-draw="" />
        </mask>
      </defs>
    </svg>
  );
};

const CoreGuardArrow = () => {
  const uid = `coreguard-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg className="vast-core-guard__arrow-svg" viewBox="0 0 20 36" fill="none" aria-hidden="true">
      <path d="M10 36L0 22H5.54444L5.55556 4.76838e-07H14.4444L14.4444 22H20L10 36Z" fill={`url(#${uid}-paint0_linear_4660_834)`} />
      <defs >
        <linearGradient id={`${uid}-paint0_linear_4660_834`} x1="10" y1="36" x2="10" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B13C00" />
          <stop offset="1" stopColor="#B13C00" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const DEFAULT_STATS = [
  { value: '32', suffix: 'x', direction: 'down', label: 'Lower Metal Leaching' },
  { value: '3', suffix: 'x', direction: 'up', label: 'Longer Lifespan' },
];

const ResponsiveImage = ({ image, mobileImage, alt = '', className = '' }) => (
  <picture className={className}>
    {mobileImage && <source media="(max-width: 1023px)" srcSet={mobileImage} />}
    {(image || mobileImage) && (
      <img src={image || mobileImage} alt={alt} loading="eager" decoding="async" />
    )}
  </picture>
);

export const VastCoreGuard = ({ data = {} }) => {
  const rootRef = useRef(null);
  const {
    eyebrow = 'CoreGuard Tech',
    title = 'Keep All 105K Looking\nAnd Tasting The Same',
    description = 'A nano-scale coating protects the heating wire from e-liquid corrosion, improving durability, stability, and flavor.',
    dayImage,
    nightImage,
    mobileDayImage,
    mobileNightImage,
    detailImage,
    mobileDetailImage,
    detailAlt = 'CoreGuard coating protects the heating wire',
    stats = DEFAULT_STATS,
    scrollDistance = 2,
    mobileScrollDistance = 1.4,
    scrub = 0.7,
    pinOffset = 0,
    onAnimationError,
  } = data;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    let disposed = false;
    let media;
    let refreshFrame;
    let refreshAfterLoad;

    const init = () => {
      try {
        gsap.registerPlugin(ScrollTrigger);
        media = gsap.matchMedia();

        media.add(
          {
            desktop: '(min-width: 1024px)',
            mobile: '(max-width: 1023px)',
            reduced: '(prefers-reduced-motion: reduce)',
          },
          (context) => {
            const { mobile, reduced } = context.conditions;
            const stage = root.querySelector('.vast-core-guard__pin');
            const scene = root.querySelector('.vast-core-guard__scene');
            const night = root.querySelector('.vast-core-guard__photo--night');
            const reveal = root.querySelector('[data-chart-reveal]');
            const paths = Array.from(root.querySelectorAll('[data-chart-draw]'));
            if (reduced) {
              gsap.set(night, { autoAlpha: 1 });
              return;
            }

            const lengths = paths.map((path) => path.getTotalLength());
            paths.forEach((path, index) => {
              gsap.set(path, {
                strokeDasharray: lengths[index],
                strokeDashoffset: lengths[index],
              });
            });
            gsap.set(reveal, { attr: { width: 0 } });
            gsap.set(night, { autoAlpha: 0 });

            // const pinTarget = mobile ? scene : stage;
            const distance = mobile ? mobileScrollDistance : scrollDistance;
            const offset = () => {
              const navHeight = window.matchMedia('(max-width: 1023px)').matches ? 0 : 0;
              return navHeight + Math.max(0, Number(pinOffset) || 0);
            };
            // const timeline = gsap.timeline({
            //   defaults: { ease: 'none' },
            //   scrollTrigger: {
            //     trigger: pinTarget,
            //     start: () => `top top+=${offset()}`,
            //     end: () => `+=${Math.max(1, Number(distance) || 1) * window.innerHeight}`,
            //     pin: true,
            //     pinSpacing: true,
            //     scrub: Math.max(0, Number(scrub) || 0),
            //     anticipatePin: 1,
            //     invalidateOnRefresh: true,
            //   },
            // });
            const timeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: mobile
                  ? {
                      trigger: scene,
                      start: 'top 20%',
                      toggleActions: 'play none none none',
                      once: true,
                    }
                  : {
                      trigger: stage,
                      start: () => `top top+=${offset}`,
                      end: () =>
                        `+=${Math.max(1, Number(distance) || 1) * window.innerHeight}`,
                      pin: true,
                      pinSpacing: true,
                      scrub: Math.max(0, Number(scrub) || 0),
                      anticipatePin: 1,
                      invalidateOnRefresh: true,
                    },
              });

            // 0—0.13 保留初始画面；中段切图与绘图；最后停留完整曲线。
            timeline.to({}, { duration: 1 }, 0);
            timeline.to(night, { autoAlpha: 1, duration: 0.46, ease: 'power1.inOut' }, 0.18);
            timeline.to(reveal, { attr: { width: 394 }, duration: 0.7 }, 0.1);
            timeline.to(paths, { strokeDashoffset: 0, duration: 0.7 }, 0.13);
            // 反向滚动自动恢复白天图，并收回曲线。
          },
          root,
        );

        refreshAfterLoad = () => {
          if (disposed) return;
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            if (!disposed) ScrollTrigger.refresh();
          });
        };
        root.querySelectorAll('img').forEach((image) => {
          if (!image.complete) image.addEventListener('load', refreshAfterLoad);
        });
        window.addEventListener('load', refreshAfterLoad);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshAfterLoad);
        refreshAfterLoad();
      } catch (error) {
        if (!disposed) {
          if (media) media.revert();
          if (onAnimationError) onAnimationError(error);
          else console.error('[VastCoreGuard] Failed to initialize animation:', error);
        }
      }
    };
    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      if (refreshAfterLoad) {
        root.querySelectorAll('img').forEach((image) => image.removeEventListener('load', refreshAfterLoad));
        window.removeEventListener('load', refreshAfterLoad);
      }
      if (media) media.revert();
    };
  }, [dayImage, nightImage, mobileDayImage, mobileNightImage, detailImage, mobileDetailImage,
    scrollDistance, mobileScrollDistance, scrub, pinOffset, onAnimationError]);

  return (
    <section className="vast-core-guard" ref={rootRef}>
      <div className="vast-core-guard__pin">
        <div className="vast-core-guard__scene-slot">
          <div className="vast-core-guard__scene">
            <ResponsiveImage image={dayImage} mobileImage={mobileDayImage} alt="VAST in a daytime cafe" className="vast-core-guard__photo vast-core-guard__photo--day" />
            <ResponsiveImage image={nightImage} mobileImage={mobileNightImage} className="vast-core-guard__photo vast-core-guard__photo--night" />
            <div className="vast-core-guard__shade" />
            <div className="vast-core-guard__chart"><CoreGuardChart /></div>
          </div>
        </div>
        <div className="vast-core-guard__panel">
          <div className="vast-core-guard__intro">
            <p className="vast-core-guard__eyebrow">{eyebrow}</p>
            <h2 className="vast-core-guard__title">
              {String(title).split('\n').map((line, index) => <span key={index}>{line}</span>)}
            </h2>
            <p className="vast-core-guard__description">{description}</p>
          </div>
          <div className="vast-core-guard__detail">
            <ResponsiveImage image={detailImage} mobileImage={mobileDetailImage} alt={detailAlt} />
          </div>
          <ul className="vast-core-guard__stats">
            {stats.map((stat, index) => (
              <li className="vast-core-guard__stat" key={stat.label || index}>
                <div className="vast-core-guard__value">
                  <strong>{stat.value}</strong><span>{stat.suffix || 'x'}</span>
                  <span className={`vast-core-guard__arrow${stat.direction === 'up' ? ' vast-core-guard__arrow--up' : ''}`} aria-hidden="true"><CoreGuardArrow /></span>
                  <span className="vast-core-guard__sr-only">{stat.direction === 'up' ? ' increase' : ' decrease'}</span>
                </div>
                <p className="vast-core-guard__stat-label">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VastCoreGuard;
