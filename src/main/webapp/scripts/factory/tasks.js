angular.module('activitiApp').factory('TasksService', function ($resource) {
    var data = $resource('runtime/tasks/:taskId', {taskId: "@taskId"},{
        update: {method: 'PUT', params: {taskId: "@taskId"}}
    });
    return data;
});