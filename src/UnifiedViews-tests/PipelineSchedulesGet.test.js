describe('Pipeline Schedule GetData Test for UnifiedViews', function() {
  const server_URL = 'http://82.202.226.30:80';
  const prefix = '/master/api/1/pipelines';
  const access = '?userExternalId=admin';
  const prefix_2 = '/master/api/1/pipelines/?userExternalId=admin';

  var username = 'master';
  var password = 'commander';
  var headers = new Headers();
  var pipeline;
  var schedule;
  headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  headers.append('Content-Type', 'application/json');

  const pipelineData = {
    name: 'scheduleEditingTesting' + Math.floor(Date.now() / 1000),
    description: '',
    userExternalId: 'admin',
  };

  it('pipeline creation test', async () => {
    //get all pipelines
    const dataSel = await fetch(server_URL.concat(prefix_2), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    const oldPipelines = dataSel.map((binding) => ({
      id: binding.id,
      name: binding.name,
      description: binding.description,
    }));
    pipeline = oldPipelines.find((o) => o.name === pipelineData.name);
    if (typeof pipeline === 'undefined') {
      //Create a new pipeline
      pipeline = await fetch(server_URL.concat(prefix), {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(pipelineData),
      }).then((r) => r.json());
    }
    console.log('pipeline', pipeline);
    expect(pipeline.name).toEqual(pipelineData.name);
  }, 30000);

  it('schedules request test', async () => {
    const scheduleData = {
      id: pipeline.id,
      description: 'First schedule',
      enabled: false,
      scheduleType: 'PERIODICALLY',
      firstExecution: '2020-02-05T18:00:51.001+0000',
      lastExecution: '2020-02-06T18:00:51.001+0000',
      nextExecution: '2020-02-06T18:00:51.001+0000',
      afterPipelines: null,
      justOnce: false,
      period: 1,
      periodUnit: 'DAY',
      scheduledJobsPriority: 0,
      userExternalId: 'admin',
    };
    console.log(scheduleData);

    const scheduleData2 = {
      id: pipeline.id,
      description: 'Second schedule',
      enabled: false,
      scheduleType: 'PERIODICALLY',
      firstExecution: '2020-01-05T18:00:51.001+0000',
      lastExecution: '2020-01-06T18:00:51.001+0000',
      nextExecution: '2020-01-06T18:00:51.001+0000',
      afterPipelines: null,
      justOnce: true,
      period: 1,
      periodUnit: 'WEEK',
      scheduledJobsPriority: 0,
      userExternalId: 'admin',
    };
    console.log(scheduleData2);

    // Create new schedule
    schedule = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules'), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(scheduleData),
    }).then((r) => r.json());
    console.log(schedule);

    // Request all schedules from pipeline
    var allSchedules = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules', access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    expect(allSchedules.length).toEqual(1);
    requestedSchedule1 = allSchedules.find((o) => o.description === scheduleData.description);

    // Create another new schedule
    var schedule2 = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules'), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(scheduleData2),
    }).then((r) => r.json());
    console.log(schedule2);

    // Request all schedules from pipeline again
    var allSchedules = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules', access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    expect(allSchedules.length).toEqual(2);
    newRequestedSchedule1 = allSchedules.find((o) => o.description === scheduleData.description);
    requestedSchedule2 = allSchedules.find((o) => o.description === scheduleData2.description);

    //Check that requested schedule hasn't changed and equals to previously requested schedule
    expect(newRequstedSchedule1).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: requestedSchedule1.description.value,
          enabled: requestedSchedule1.enabled.value,
          firstExecution: requestedSchedule1.firstExecution.value,
          lastExecution: requestedSchedule1.lastExecution.value,
          nextExecution: requestedSchedule1.nextExecution.value,
          afterPipelines: requestedSchedule1.afterPipelines.value,
          justOnce: requestedSchedule1.justOnce.value,
          period: requestedSchedule1.period.value,
          periodUnit: requestedSchedule1.periodUnit.value,
        }),
      ]),
    );

    //Check that second requested schedule from the list has correct data
    expect(requstedSchedule2).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: scheduleData2.description.value,
          enabled: scheduleData2.enabled.value,
          firstExecution: scheduleData2.firstExecution.value,
          lastExecution: scheduleData2.lastExecution.value,
          nextExecution: scheduleData2.nextExecution.value,
          afterPipelines: scheduleData2.afterPipelines.value,
          justOnce: scheduleData2.justOnce.value,
          period: scheduleData2.period.value,
          periodUnit: scheduleData2.periodUnit.value,
        }),
      ]),
    );

    //Get concrete schedule data from pipeline
    var NewlyCreatedSchedule = await fetch(
      server_URL.concat(prefix, '/', pipeline.id, '/schedules', '/', schedule.id, access),
      {
        method: 'GET',
        headers: headers,
      },
    ).then((r) => r.json());
    console.log(NewlyCreatedSchedule);
    const newScheduleData = NewlyCreatedSchedule.map((binding) => ({
      description: binding.description.value,
      enabled: binding.enabled.value,
      firstExecution: binding.firstExecution.value,
      lastExecution: binding.lastExecution.value,
      nextExecution: binding.nextExecution.value,
      afterPipelines: binding.afterPipelines.value,
      justOnce: binding.justOnce.value,
      period: binding.period.value,
      periodUnit: binding.periodUnit.value,
    }));

    //Check that requested schedule has correct data
    expect(newScheduleData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: scheduleData.description.value,
          enabled: scheduleData.enabled.value,
          firstExecution: scheduleData.firstExecution.value,
          lastExecution: scheduleData.lastExecution.value,
          nextExecution: scheduleData.nextExecution.value,
          afterPipelines: scheduleData.afterPipelines.value,
          justOnce: scheduleData.justOnce.value,
          period: scheduleData.period.value,
          periodUnit: scheduleData.periodUnit.value,
        }),
      ]),
    );
  }, 30000);
});
