import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JankenService } from './janken.service';

describe('JankenService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: JankenService = TestBed.get(JankenService);
    expect(service).toBeTruthy();
  });

  it('init state is', () => {
    const service: JankenService = TestBed.get(JankenService);
    expect(service.player).toBe('GU');
    expect(service.enemy).toBe('GU');
    expect(service.issue).toBe('DRAW');
    expect(service.isInitPhase()).toBeTruthy();
    expect(service.isStartedPhase()).toBeFalsy();
    expect(service.isFinishedPhase()).toBeFalsy();
    expect(service.hasError()).toBeFalsy();
  });

  it('janken win', async () => {
    const service: JankenService = TestBed.get(JankenService);
    const res = service.janken('GU');

    expect(service.isInitPhase()).toBeFalsy();
    expect(service.isStartedPhase()).toBeTruthy();
    expect(service.isFinishedPhase()).toBeFalsy();

    const req = httpTestingController.expectOne('/api/janken');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toBe('{"player":"GU"}');
    req.flush({player: 'GU', enemy: 'CHOKI', issue: 'WIN'});
    httpTestingController.verify();

    await res;

    expect(service.player).toBe('GU');
    expect(service.enemy).toBe('CHOKI');
    expect(service.issue).toBe('WIN');
    expect(service.isInitPhase()).toBeFalsy();
    expect(service.isStartedPhase()).toBeFalsy();
    expect(service.isFinishedPhase()).toBeTruthy();
    expect(service.hasError()).toBeFalsy();
  });

  it('janken error', async () => {
    const service: JankenService = TestBed.get(JankenService);
    const res = service.janken('GU');

    expect(service.isInitPhase()).toBeFalsy();
    expect(service.isStartedPhase()).toBeTruthy();
    expect(service.isFinishedPhase()).toBeFalsy();

    const req = httpTestingController.expectOne('/api/janken');
    req.flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });

    await res;

    expect(service.isInitPhase()).toBeFalsy();
    expect(service.isStartedPhase()).toBeFalsy();
    expect(service.isFinishedPhase()).toBeTruthy();
    expect(service.hasError()).toBeTruthy();
  });
});
