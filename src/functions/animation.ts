import gsap from "gsap";

export const vanish = (what: gsap.TweenTarget, duration?: number) => {
    gsap.timeline().to(what, {
        opacity: 0,
        duration: duration?? 0,
    })
    .to(what, {
        display: 'none',
        duration: 0,
    });
}

export const spawn = (what: gsap.TweenTarget, duration?: number) => {
    gsap.timeline().to(what, {
        display: 'inline',
        duration: 0,
    }).to(what, {
        opacity: 1,
        duration: duration?? 0,
    });
}

export const move = (what: gsap.TweenTarget, pct: number, duration?: number) => {
    gsap.to(what, {
        y: pct,
        ease: 'back',
        duration: duration?? 0,
    });
}

export const spawnAndMove = (what: gsap.TweenTarget, pct: number, duration?: number) => {
    gsap.timeline().to(what, {
        display: 'inline',
        opacity: 0,
        duration: 0,
    }).to(what, {
        y: pct,
        opacity: 1,
        ease: 'back',
        duration: duration?? 0,
    });
}

export const moveAndVanish = (what: gsap.TweenTarget, pct: number, duration?: number) => {
    gsap.timeline().to(what, {
        y: pct,
        opacity: 0,
        ease: 'back',
        duration: duration?? 0,
    }).to(what, {
        display: 'none',
        duration: 0,
    });
}