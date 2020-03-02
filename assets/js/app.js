
_.forEach(stateData, function(state, key){

    var output = '';

    // Start output for each state's hover info
    output += '<strong>' + state.name + '</strong>';
    output += '<span class="caucus">';
        if(state.caucus) output += 'Caucus';
        else output += 'Primary';
    output += '</span>';

    // If state has voted yet
    if(state.votes){

        // Color Map    
        var sortedVotes = _.orderBy(state.votes, ['delegates'], ['desc']);
        $('#' + key).addClass("c" + sortedVotes[0].id);

        var counter = 0;
        
        // Start Votes table
        output += '<table class="votes">';
            output += '<tr>';
                output += '<th>Name</th>';
                output += '<th>Votes</th>';
                output += '<th>Delegates</th>';
            output += '</tr>';

        // Loop for each Candidate in State   
        _.forEach(state.votes, function(candidate){

            // Color in state and count delegates
            var foundIndex = candidates.findIndex(x => x.id == candidate.id)
            if(foundIndex > -1){
                candidates[foundIndex].delegates += candidate.delegates;
            }

            // Print state's hover info table
            if(counter < 5){
                output += '<tr>'
                    output += '<td>' + candidates[foundIndex].name + '</td>'
                    output += '<td>' + candidate.finalVote + '</td>'
                    output += '<td>' + candidate.delegates + '</td>'
                output += '</tr>';
            }

            counter ++
        })
        output += '</table>'

    } else{ // State is upcoming
        output += '<span>Votes on' + state.date + '</span>';
        output += '<span>' + state.delegates + ' delegates available</span>';
    }

    $('#' + key).attr('data-info', output);

});

// Output total delegate counter
var needed = 1991;
var totalDelgates = 3979;

candidates = _.sortBy(candidates, ['delegates']).reverse();

var output = '<table>'
_.forEach(candidates, function(c){
    
    //var barWidth = c.delegates/1991 * 100;
    var barWidth = (c.delegates / needed * 100).toFixed(2);
    
    if(barWidth > 0){
        output += '<tr id="' + c.id + '">';
            output += '<td class="name">' + c.name + '</td>';
            output += '<td class="bar">';
                output += '<span class="bar-number">' + c.delegates + '<span>(' + barWidth +  '%)</span>'+ '</span>';
                output += '<span class="bar-color c' + c.id + '" style="width:' + barWidth + '%;"></span>';
            output += '</td>';
        output += '</tr>';
    }
});
output += '</table>';

$('.delegates').html(output);








