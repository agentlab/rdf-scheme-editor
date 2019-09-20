describe('Pipeline Schedule Editing Test for UnifiedViews', function() {
  const server_URL = 'http://82.202.226.30:80';
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

  it('schedule creation test', async () => {
    const scheduleData = {
      id: pipeline.id,
      description: 'Runs after other pipelines',
      enabled: false,
      firstExecution: '2020-02-05T18:00:51.001+0000',
      scheduledJobsPriority: 0,
      userExternalId: 'admin',
    };
    console.log(scheduleData);

    // Create new schedule
    schedule = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules'), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(scheduleData),
    }).then((r) => r.json());

    console.log(schedule);
    const newSchedule = schedule.map((binding) => ({
      description: binding.description.value,
      enabled: binding.enabled.value,
      firstExecution: binding.firstExecution.value,
      scheduledJobsPriority: binding.scheduledJobsPriority.value,
    }));
    //Check if created schedule has correct data
    expect(newSchedule).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: scheduleData.description.value,
          enabled: scheduleData.enabled.value,
          firstExecution: scheduleData.firstExecution.value,
          scheduledJobsPriority: scheduleData.scheduledJobsPriority.value,
        }),
      ]),
    );
  }, 30000);

  it('schedule editing test', async () => {
    // Make new edited data
    var oldSchedule = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules', '/', schedule.id, access), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    console.log(oldSchedule);
    const scheduleData = oldSchedule.map((binding) => ({
      description: binding.description.value,
      enabled: binding.enabled.value,
      firstExecution: binding.firstExecution.value,
      scheduledJobsPriority: binding.scheduledJobsPriority.value,
    }));

    var editData = {
      id: oldSchedule.id,
      description: 't' + Math.floor(Date.now() / 1000),
      enabled: false,
      firstExecution: '2020-02-07T18:00:51.001+0000',
      scheduledJobsPriority: 0,
      userExternalId: 'admin',
    };
    console.log(editData);
    // Check if data before editing was different
    expect(scheduleData).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: editData.description.value,
          enabled: editData.enabled.value,
          firstExecution: editData.firstExecution.value,
          scheduledJobsPriority: editData.scheduledJobsPriority.value,
        }),
      ]),
    );
    // Edit existing schedule
    const editedSchedule = await fetch(server_URL.concat(prefix, '/', 1, '/schedules/', editData.id), {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(editData),
    }).then((r) => r.json());
    console.log(editedSchedule);

    // Get edited schedule
    const getEditedSchedule = await fetch(server_URL.concat(prefix, '/', pipeline.id, '/schedules/', schedule.id), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    console.log(getEditedSchedule);
    const scheduleEditedData = getEditedSchedule.map((binding) => ({
      description: binding.description.value,
      enabled: binding.enabled.value,
      firstExecution: binding.firstExecution.value,
      scheduledJobsPriority: binding.scheduledJobsPriority.value,
    }));
    // Check if schedule data after editing was equal
    expect(scheduleEditedData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: editData.description.value,
          enabled: editData.enabled.value,
          firstExecution: editData.firstExecution.value,
          scheduledJobsPriority: editData.scheduledJobsPriority.value,
        }),
      ]),
    );
  }, 30000);
});
