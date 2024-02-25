import gsap from "gsap";
import { coordinateType, sizeType } from "src/types";

export const fade = (
  what: gsap.TweenTarget,
  pct: number,
  duration?: number,
  delay?: number
) => {
  gsap.to(what, {
    opacity: pct,
    duration: duration ?? 0,
    delay: delay ?? 0,
  });
};

export const fadeIn = (what: gsap.TweenTarget, duration?: number) => {
  gsap.to(what, {
    opacity: 1,
    duration: duration ?? 0,
  });
};

export const fadeOut = (what: gsap.TweenTarget, duration?: number) => {
  gsap.to(what, {
    opacity: 0,
    duration: duration ?? 0,
  });
};

export const vanish = (what: gsap.TweenTarget, duration?: number) => {
  gsap
    .timeline()
    .to(what, {
      opacity: 0,
      duration: duration ?? 0,
    })
    .to(what, {
      display: "none",
      duration: 0,
    });
};

export const spawn = (
  what: gsap.TweenTarget,
  duration?: number,
  delay?: number,
  display?: string
) => {
  gsap
    .timeline()
    .to(what, {
      display: display ?? "flex",
      duration: 0,
      opacity: 0,
    })
    .to(what, {
      opacity: 1,
      duration: duration ?? 0,
      delay: delay ?? 0,
    });
};

export const move = (
  what: gsap.TweenTarget,
  where: coordinateType,
  duration?: number,
  delay?: number
) => {
  gsap.to(what, {
    ...where,
    ease: "back",
    duration: duration ?? 0,
    delay: delay ?? 0,
  });
};

export const spawnAndMove = (
  what: gsap.TweenTarget,
  where: coordinateType,
  duration?: number,
  display?: string
) => {
  gsap
    .timeline()
    .to(what, {
      display: display ?? "flex",
      opacity: 0,
      duration: 0,
    })
    .to(what, {
      ...where,
      ease: "back",
      duration: duration ?? 0,
    });
  gsap.to(what, {
    opacity: 1,
    duration: duration ? 1.25 * duration : 0,
    ease: "back",
  });
};

export const moveAndVanish = (
  what: gsap.TweenTarget,
  where: coordinateType,
  duration?: number
) => {
  gsap.to(what, {
    opacity: 0,
    duration: duration ? 1.5 * duration : 0,
    ease: "back",
  });
  gsap
    .timeline()
    .to(what, {
      ...where,
      ease: "back",
      duration: duration ?? 0,
    })
    .to(what, {
      display: "none",
      duration: 0,
    });
};

export const spawnAndScale = (
  what: gsap.TweenTarget,
  scale: number,
  duration?: number,
  display?: string
) => {
  gsap
    .timeline()
    .to(what, {
      display: display ?? "flex",
      opacity: 1,
      scale: 0,
      duration: 0,
    })
    .to(what, {
      scale,
      ease: "back",
      duration: duration ?? 0,
    });
};

export const scaleAndVanish = (
  what: gsap.TweenTarget,
  scale: number,
  duration?: number
) => {
  gsap
    .timeline()
    .to(what, {
      scale: 1.1,
      ease: "back",
      duration: duration ? duration / 2 : 0,
    })
    .to(what, {
      scale,
      ease: "power2",
      duration: duration ?? 0,
    })
    .to(what, {
      display: "none",
      duration: 0,
    });
};

export const scale = (
  what: gsap.TweenTarget,
  newScale: number,
  duration?: number,
  delay?: number
) => {
  gsap.to(what, {
    scale: newScale,
    ease: "back",
    duration: duration ?? 0,
    delay: delay ?? 0,
  });
};

export const resize = (
  what: gsap.TweenTarget,
  newSize: sizeType,
  duration?: number,
  delay?: number
) => {
  gsap.to(what, {
    ...newSize,
    ease: "back",
    duration: duration ?? 0,
    delay: delay ?? 0,
  });
};

export const reactToClick = (
  what: gsap.TweenTarget,
  onClick: () => void,
  duration?: number,
  side?: "left" | "right"
) => {
  const angle = side && side === "left" ? 90 : -90;

  gsap
    .timeline()
    .to(what, {
      rotate: angle,
      ease: "back",
      duration: duration ? duration / 4 : 0.25,
    })
    .call(onClick)
    .to(what, {
      rotate: 0,
      ease: "back",
      duration: duration ? (3 * duration) / 4 : 0.75,
    });
};

export const rotate = (
  what: gsap.TweenTarget,
  angle: number,
  duration?: number,
  delay?: number
) => {
  gsap.to(what, {
    rotate: angle,
    ease: "back",
    duration: duration ?? 0,
    delay: delay ?? 0,
  });
};
