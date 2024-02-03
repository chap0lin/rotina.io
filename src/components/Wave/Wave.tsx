interface props {
  color: string;
  style?: React.CSSProperties;
}

export default function Wave({ style, color }: props) {
  //TODO implement a decent, configurable wave

  return (
    <svg
      id="svg"
      viewBox="0 0 1440 390"
      style={style}
      preserveAspectRatio="none">
      <path
        d={`M 0,400
                    C 0,400 0,200 0,200
                    C 191.6,230.1 383.2,260.3 521,241
                    C 658.8,221.7 742.8,153.1 887,138
                    C 1031.2,122.9 1235.6,161.5 1440,200
                    C 1440,200 1440,400 1440,400 Z`}
        stroke="none"
        stroke-width="0"
        fill={color}
        fill-opacity="1"
      />
    </svg>
  );
}
