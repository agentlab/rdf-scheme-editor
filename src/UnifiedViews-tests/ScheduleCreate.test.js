describe('Pipeline Schedule Creating Test for UnifiedViews', function() {
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


  

  it('schedule creation test', async () => {
    const scheduleData = {
      id: 1,
      enabled: true,
      firstExecution: '2020-02-05T18:00:51.001+0000',
      userExternalId: 'admin',
    };
    console.log(scheduleData);

    // Create new schedule
    schedule = await fetch(server_URL.concat(prefix, '/', 1, '/schedules'), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(scheduleData),
    }).then((r) => r.json());

    console.log(schedule);
    const newSchedule = schedule.map((binding) => ({
      id: binding.pipeline.value,
      enabled: binding.enabled.value,
      firstExecution: binding.firstExecution.value,
    }));
    //Check if created schedule has correct data
    expect(newSchedule).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: scheduleData.id.value,
          enabled: scheduleData.enabled.value,
          firstExecution: scheduleData.firstExecution.value,
        }),
      ]),
    );
  }, 30000);
});