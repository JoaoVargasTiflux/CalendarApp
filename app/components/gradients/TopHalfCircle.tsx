import * as React from "react";
import type { SVGProps } from "react";

const TopHalfCircleGradient = (props: SVGProps<SVGSVGElement>) => 
  <svg
  viewBox="0 0 1024 1024"
  aria-hidden="true"
  className=""
  {...props}>
    <circle
    cx={512}
    cy={512}
    r={512}
    fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
    fillOpacity="0.7">
    </circle>
    <defs>
      <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
        <stop stopColor="orange" />
      </radialGradient>
    </defs>
  </svg>;

export default TopHalfCircleGradient;