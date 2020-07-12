import { animate, state, style, transition, trigger } from '@angular/animations';

export const alertAnimations = {
  fromAbove: getAlertAnimation('fromAbove', 'translateY(-70%)'),
  fromBelow: getAlertAnimation('fromBelow', 'translateY(70%)')
};

export function getAlertAnimation(name: string, translateY: string) {
  return trigger(name, [
    state(
      'void, closed',
      style({
        transform: translateY,
        opacity: 0
      })
    ),
    state(
      'open',
      style({
        transform: 'translateY(0)',
        opacity: 1
      })
    ),
    transition('* => open', animate('350ms cubic-bezier(0, 0, 0.2, 1)')),
    transition(
      '* => void, * => closed',
      animate(
        '200ms cubic-bezier(0.4, 0.0, 1, 1)',
        style({
          transform: translateY,
          opacity: 0
        })
      )
    )
  ]);
}
