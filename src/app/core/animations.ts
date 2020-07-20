import { trigger, transition, query, stagger, animate, style } from '@angular/animations';

const animationCurve = '300ms cubic-bezier(.2, 0, .3, 1)';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':leave', stagger(50, animate(animationCurve, style({ opacity: 0, height: '0' }))), {
      optional: true
    }),
    query(
      ':enter',
      [
        style({ opacity: 0, height: '0' }),
        stagger(-50, animate(animationCurve, style({ opacity: 1, height: '*' })))
      ],
      { optional: true }
    )
  ])
]);
