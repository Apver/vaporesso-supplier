import {useEffect, useRef} from 'react';

/**
 * 按字符拆分文本，供 showcase2 弹簧动画使用（源自 a.js split-text）
 */
export function SplitText({children, className}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const text = (children ?? root.textContent ?? '').toString().trim();
    if (!text) return;

    root.innerHTML = '';
    const rawWords = text.split(/\s+/);
    let globalCharIndex = 0;
    const chars = [];

    rawWords.forEach((wordStr, index) => {
      const wordDiv = document.createElement('div');
      wordDiv.style.display = 'inline-block';
      wordDiv.className = 'split-word';

      [...wordStr].forEach((char) => {
        globalCharIndex += 1;
        const charDiv = document.createElement('div');
        charDiv.style.display = 'inline-block';
        charDiv.className = 'split-char';
        charDiv.textContent = char;
        charDiv.style.setProperty('--char-index', String(globalCharIndex));
        wordDiv.appendChild(charDiv);
        chars.push(charDiv);
      });

      root.appendChild(wordDiv);
      if (index < rawWords.length - 1) {
        root.appendChild(document.createTextNode(' '));
      }
    });

    root.style.setProperty('--char-total', String(globalCharIndex));
    root.offsetHeight;

    let currentLineTop = -1;
    const linesData = [];

    Array.from(root.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains('split-word')
      ) {
        const top = node.offsetTop;
        if (currentLineTop === -1 || Math.abs(top - currentLineTop) > 5) {
          currentLineTop = top;
          linesData.push([]);
        }
      }
      if (linesData.length > 0) {
        linesData[linesData.length - 1].push(node);
      }
    });

    linesData.forEach((group) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'split-line';
      lineDiv.style.display = 'block';
      root.insertBefore(lineDiv, group[0]);
      group.forEach((node) => lineDiv.appendChild(node));
    });
  }, [children]);

  return (
    <span
      className={['split-text', className].filter(Boolean).join(' ')}
      ref={rootRef}
      suppressHydrationWarning
    />
  );
}
