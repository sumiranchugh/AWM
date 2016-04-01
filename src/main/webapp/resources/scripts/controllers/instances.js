angular.module('activitiApp').controller('InstancesCtrl', function ($scope, $rootScope, $location,  $modal, moment,TasksService,
                                                                    ProcessInstancesQueryService,ProcessInstancesService,ProcessInstanceService,
                                                                    ProcessDefinitionService,TasksIdentityService) {



    $scope.loadDefinitions = function (all) {
        if(!all) {

            var id = {};
            var query = {
                "variables": [{"name": "initiator", "value": $rootScope.UserId, "operation": "like", "type": "string"}],
                "includeProcessVariables":true
            }
            var query = new ProcessInstancesQueryService(query);
            query.$save().then(function (data) {
                $scope.instances = data;
                processInstanceData(data);
            })

        }

        if(all) {
           // var query = {size: 1000, latest: "true", sort: "id"};
            var query = {"includeProcessVariables":true};
            var query = new ProcessInstancesQueryService(query);
            query.$save().then( function (instances) {
                $scope.instances = instances;
                processInstanceData(instances);
            });
        }


   }

 //   $scope.loadDefinitions(false);


    var processInstanceData =  function(instances){
        ProcessDefinitionService.get({latest: "true"}, function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var definition = data.data[i];
                for (var j = 0; j < instances.data.length; j++) {
                    if (instances.data[j].processDefinitionId == definition.id) {
                        instances.data[j].name = definition.name;
                    }
                }
            }
        });
    }


    var InstancesDetailsCtrl = function ($scope, $modalInstance,instance)
    {
        $scope.instance =  instance;
        $scope.ok = function () {
            $modalInstance.close(group);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.delete = function (instance) {


            $modalInstance.dismiss('cancel');
        };

        $scope.diagram = "runtime/process-instances/"+instance.id+"/diagram";


        $scope.startuser="unknown";
        $scope.instance.details = ProcessInstancesService.get({processInstance:instance.id, returnProcessVariables:true});

        $scope.instance.tasks = TasksService.tasksforprocess({processInstance:instance.id});

        var candidates = function () {
            $scope.instance.tasks.$promise.then(
                function () {
                    for (i in $scope.instance.tasks.data) {
                        $scope.instance.tasks.data[i].candidates = [];
                        var params= {taskId: $scope.instance.tasks.data[i].id};
                        TasksIdentityService.query(params).$promise.then(
                            function (data) {
                                for (j in data)
                                if(typeof data[j].user!= 'undefined')
                                    $scope.instance.tasks.data[i].candidates.push(data[j].user);
                            }
                        );
                    }
                })
        };
        var initiator = function() {
            for (v in instance.variables) {
                if (instance.variables[v].name === 'initiator') {
                    //$scope.instance.details.user= instance.variables[v].value;
                    $scope.startuser= instance.variables[v].value;
                }
            }
           //  $scope.instance.details.user="";
        };

        initiator();
        candidates();

    }

    $scope.showDetails = function (instance) {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/instanceDetails.html',
            controller: InstancesDetailsCtrl,
            resolve: {
                instance: function () {
                    return instance;
                }
            }
        });
        modalInstance.result.then(function (newGroup) {

        }, function () {
        });
    };

    $scope.query = "";

    $rootScope.validateUser.then(function(){
        $scope.loadDefinitions($rootScope.any);

    });
});
