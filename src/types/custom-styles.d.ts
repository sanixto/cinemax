declare namespace JSX {
  interface IntrinsicElements {
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      style?: React.CSSProperties & {
        '--value'?: string;
      };
    };
  }
}