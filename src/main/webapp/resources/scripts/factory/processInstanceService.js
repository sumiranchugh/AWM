angular.module('activitiApp').factory('ProcessInstanceService', function ($resource) {
    var data = $resource('process-instance/:processInstance', {processInstance: "@processInstance"});
    return data;
});
