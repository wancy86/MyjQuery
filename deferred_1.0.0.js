function Deferred() {
    this.doneList = [];
    this.failList = [];
}
Deferred.prototype.promise = function() {
    var def = this;
    var promise = {};
    promise.done = function(callBack) {
        def.doneList.push(callBack);
        return def.promise();
    };
    promise.fail = function(callBack) {
        def.failList.push(callBack);
        return def.promise();
    };
    return promise;
};

Deferred.prototype.resolved = function() {
    this.failList = [];
    for (var i in this.doneList) {
        this.doneList[i]();
    }
};
Deferred.prototype.rejected = function() {
    this.doneList = [];
    for (var i in this.failList) {
        this.failList[i]();
    }
};

//test code 1
var when = function() {
    var deferred = new Deferred();
    console.log('schedule task1...');
    var task1 = function() {
        console.log('processing task1...');
        deferred.resolved();
    }
    setTimeout(task1, 3000);
    return deferred.promise();
}
when()
    .done(function() {
        console.log('task1 done 1...');
    })
    .fail(function() {
        console.log('task1 failed 1...');
    })
    .done(function() {
        console.log('task1 done 2...');
    })
    .fail(function() {
        console.log('task1 failed 2...');
    });

//test code 2
var when2 = function() {
    var deferred = new Deferred();
    console.log('schedule task2...');
    var task2 = function() {
        console.log('processing task2...');
        deferred.rejected();
    }
    setTimeout(task2, 6000);
    return deferred.promise();
}
when2()
    .done(function() {
        console.log('task2 done 1...');
    })
    .fail(function() {
        console.log('task2 failed 1...');
    })
    .done(function() {
        console.log('task2 done 2...');
    })
    .fail(function() {
        console.log('task2 failed 2...');
    });


