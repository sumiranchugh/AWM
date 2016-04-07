angular.module('activitiApp').factory('TasksService', function ($resource) {
    var data = $resource('runtime/tasks/:taskId', {taskId: "@taskId"},{
        update: {method: 'PUT', params: {taskId: "@taskId"}},
        candidateTasks:{method: 'GET', params:{candidateUser:"@candidateUser"}},
        assignedTasks:{method: 'GET', params:{assignee:"@assignee"}},
        tasksforprocess:{methos:'GET', params:{processInstanceId: "@processInstanceId"}}
    });
    return data;
});

angular.module('activitiApp').factory('TasksIdentityService', function ($resource) {
    var data = $resource('runtime/tasks/:taskId/identitylinks', {taskId: "@taskId"});
    return data;
});


angular.module('activitiApp').factory('TasksSubmitService', function ($resource) {
    var data = $resource('runtime/tasks/submit/:taskId', {taskId: "@taskId"});
    return data;
});

//http://localhost:8080//runtime/tasks/40025/identitylinks