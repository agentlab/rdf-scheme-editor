describe('Pipeline Schedule Editing Test for UnifiedViews', function() {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const server_URL = 'http://82.202.226.30:8080';
  const prefix = '/master/api/1/pipelines';
  const access = '?userExternalId=admin';
  const prefix_2 = '/master/api/1/pipelines/?userExternalId=admin';
  const props = ['name', 'description'];

  var username = 'master';
  var password = 'commander';
  var headers = new Headers();
  var pipeline;
  var schedule;
  headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  headers.append('Content-Type', 'application/json');

  const pipelineData = {
    name: 'scheduleEditingTesting2',
    description: '',
    userExternalId: 'admin',
  };

  it('pipeline creation test', async () => {
    //get all pipelines
    const dataSel = await fetch(proxy + server_URL.concat(prefix_2), {
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
      pipeline = await fetch(proxy + server_URL.concat(prefix), {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(pipelineData),
      }).then((r) => r.json());
    }
    console.log('pipeline', pipeline);
    expect(pipeline.name).toEqual(pipelineData.name);
  }, 30000);

  it('schedule creation test', async () => {
    const scheduleData = {
      description: 'Runs after other pipelines',
      justOnce: false,
      enabled: false,
      firstExecution: '2014-08-08T15:15:15.555Z',
      afterPipelines: [15, 54],
      period: null,
      periodUnit: null,
      userExternalId: 'admin',
    };
    console.log(scheduleData);
    // Get all schedules from our pipelines
    const pipel = await fetch(proxy.concat(server_URL, prefix, '/', pipeline.id, access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    console.log(pipel);

    // Get all schedules from our pipelines
    const oldSchedules = await fetch(proxy.concat(server_URL, prefix, '/', 1, '/schedules', access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    console.log(oldSchedules);
    if (oldSchedules.length > 0) {
      schedule = oldSchedules[0];
    } else {
      // Create new schedule
      schedule = await fetch(proxy.concat(server_URL, prefix, '/', 1, '/schedules'), {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(scheduleData),
      }).then((r) => r.json());
    }
    console.log(schedule);
    expect(schedule).toMatch(scheduleData);
  }, 30000);

  it('schedule editing test', async () => {
    // Make new edited data
    var oldSchedules = await fetch(proxy.concat(server_URL, prefix, '/', 1, '/schedules', access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    console.log(oldSchedules);
    var scheduleData = oldSchedules[0];
    var editedScheduleData = scheduleData;
    editedScheduleData.description = 't' + Math.floor(Date.now() / 1000);
    var editData = {
      id: oldSchedules[1].id,
      description: 't' + Math.floor(Date.now() / 1000),
      justOnce: false,
      enabled: false,
      firstExecution: '2014-08-08T15:15:15.555Z',
      lastExecution: null,
      afterPipelines: [15, 54],
      period: null,
      periodUnit: null,
    };
    console.log(editData);
    // Edit existing schedule
    const editedSchedule = await fetch(proxy.concat(server_URL, prefix, '/', 1, '/schedules/', editData.id), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(editData),
    }).then((r) => r.json());
    console.log(editedSchedule);
    expect(editedScheduleData).toMatch(editedSchedule);

    // Get edited schedule
    const getEditedSchedule = await fetch(
      proxy.concat(server_URL, prefix, '/', pipeline.id, '/schedules/', schedule.id),
      {
        method: 'GET',
        headers: headers,
      },
    ).then((r) => r.json());
    console.log(getEditedSchedule);
    expect(editedScheduleData).toMatch(getEditedSchedule);
  }, 30000);
});
