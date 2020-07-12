import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { getGlobalElement, getGlobalElements } from '../../testing/dom-helpers';
import { AlertSeverity } from './alert-severity';
import { AlertModule } from './alert.module';
import { AlertService } from './alert.service';

@Component({})
class AlertTestComponent {
  title = 'Alert title';
  content = 'Alert content';
  action: string | undefined = 'Accept';
  closeable = true;
  duration = 5000;
  severity: AlertSeverity = 'info';
  result: boolean | undefined;

  constructor(private alertService: AlertService) {}

  openAlert() {
    this.alertService
      .open(this.title, this.content, {
        action: this.action,
        closeable: this.closeable,
        duration: this.duration,
        severity: this.severity
      })
      .afterClosed()
      .subscribe((result) => (this.result = result));
  }
}

describe('Ix3AlertService', () => {
  const animationDuration = 500;
  let fixture: ComponentFixture<AlertTestComponent>;
  let component: AlertTestComponent;
  let overlayContainer: OverlayContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AlertModule, NoopAnimationsModule],
      declarations: [AlertTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTestComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('When an alert is opened', () => {
    beforeEach(() => {
      component.openAlert();
      fixture.detectChanges();
    });

    it('a title is displayed', () => {
      expect(getGlobalElement('.ix3-alert__title')?.textContent).toBe(component.title);
    });

    it('content is displayed', () => {
      expect(getGlobalElement('.ix3-alert__content')?.textContent).toBe(component.content);
    });

    it('an action button is displayed', () => {
      expect(getGlobalElement('.ix3-alert__action-button')?.textContent).toContain(component.action);
    });

    it('an icon is displayed', () => {
      expect(getGlobalElement('.ix3-alert__icon')).not.toBeNull();
    });

    it('a close button is displayed', () => {
      expect(getGlobalElement('.ix3-alert__close-button')).not.toBeNull();
    });

    it('the alert has a severity', () => {
      expect(getGlobalElement('ix3-alert')?.classList.value).toContain('ix3-alert--info');
    });

    it('the alert is positioned at the top', () => {
      const container = getGlobalElement('.cdk-global-overlay-wrapper')!;
      expect(window.getComputedStyle(container).alignItems).toBe('flex-start');
    });

    describe('and the close button is clicked', () => {
      beforeEach(fakeAsync(() => {
        getGlobalElement('.ix3-alert__close-button')?.click();
        fixture.detectChanges();
        tick(500);
      }));

      it('the dialog should close', () => {
        expect(getGlobalElement('ix3-alert')).toBeNull();
        expect(component.result).toBe(false);
      });
    });

    describe('and action button is clicked', () => {
      beforeEach(fakeAsync(() => {
        getGlobalElement('.ix3-alert__action-button')?.click();
        fixture.detectChanges();
        tick(500);
      }));

      it('the dialog should close', () => {
        expect(getGlobalElement('ix3-alert')).toBeNull();
        expect(component.result).toBe(true);
      });
    });
  });

  describe('When no action text is provided', () => {
    beforeEach(() => {
      component.action = undefined;
    });

    it('no action button should be visible', () => {
      component.openAlert();
      fixture.detectChanges();
      expect(getGlobalElement('.ix3-alert__action-button')).toBeNull();
    });

    it('the dialog should close after the desired timeout', fakeAsync(() => {
      component.duration = 1000;
      component.openAlert();
      fixture.detectChanges();
      tick(animationDuration);
      expect(getGlobalElement('ix3-alert')).not.toBeNull();
      tick(animationDuration);
      expect(getGlobalElement('ix3-alert')).toBeNull();
    }));
  });

  describe('When an action text is provided', () => {
    beforeEach(() => {
      component.action = 'Accept';
    });

    it('the dialog should not close after the desired timeout', fakeAsync(() => {
      component.duration = 1000;
      component.openAlert();
      fixture.detectChanges();
      tick(animationDuration);
      expect(getGlobalElement('ix3-alert')).not.toBeNull();
      tick(animationDuration);
      expect(getGlobalElement('ix3-alert')).not.toBeNull();
    }));
  });

  describe('When the alert is opened', () => {
    beforeEach(() => {
      component.openAlert();
      fixture.detectChanges();
    });

    it('the dialog should be placed at the bottom of the screen', () => {
      const container = getGlobalElement('.cdk-global-overlay-wrapper')!;
      expect(window.getComputedStyle(container).alignItems).toBe('flex-end');
    });
  });

  describe('When a new alert is opened before the previous has closed', () => {
    beforeEach(fakeAsync(() => {
      component.title = 'Alert one';
      component.openAlert();
      fixture.detectChanges();

      component.title = 'Alert two';
      component.openAlert();
      fixture.detectChanges();

      tick(animationDuration);
    }));

    it('only the last dialog is open', () => {
      expect(getGlobalElements('ix3-alert').length).toBe(1);
      expect(getGlobalElement('.ix3-alert__title')?.textContent).toBe('Alert two');
    });
  });

  describe('When the direction is rtl', () => {
    beforeEach(() => {
      document.dir = 'rtl';
      component.openAlert();
      fixture.detectChanges();
    });

    afterEach(() => {
      document.dir = 'ltr';
    });

    it('the alert is aligned to the left', () => {
      const container = getGlobalElement('.cdk-global-overlay-wrapper')!;
      expect(window.getComputedStyle(container).justifyContent).toBe('flex-end');
    });
  });

  describe('When the severity is success', () => {
    beforeEach(() => {
      component.severity = 'success';
      component.openAlert();
      fixture.detectChanges();
    });

    it('the alert should get appropriate styles', () => {
      expect(getGlobalElement('ix3-alert')?.classList.value).toContain('ix3-alert--success');
    });
  });

  describe('When the severity is error', () => {
    beforeEach(() => {
      component.severity = 'error';
      component.openAlert();
      fixture.detectChanges();
    });

    it('the alert should get appropriate styles', () => {
      expect(getGlobalElement('ix3-alert')?.classList.value).toContain('ix3-alert--error');
    });
  });
});
