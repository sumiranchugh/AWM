angular.module('activitiApp').factory('ProcessInstancesService', function ($resource) {
    var data = $resource('runtime/process-instances/:processInstance', {processInstance: "@processInstance"});
    return data;
});
