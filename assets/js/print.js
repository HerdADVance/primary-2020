function printStateInfo(){

    var nextUp = false;
    var nextDate = '';
    var nextDone = false;

    _.forEach(stateData, function(state, key){ 

        var output = '';

        // Start output for each state's hover info
        output += '<strong>' + state.name + '</strong>';
        output += '<span class="caucus">';
            output += state.delegates + ' delegates | ';
            if(state.caucus) output += 'Caucus';
            else output += 'Primary';
        output += ': ' + state.date + '</span>';
        

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
                    output += '<th>Pct</th>';
                    output += '<th>Delegates</th>';
                output += '</tr>';

            // Add total votes for each state
            var totalVotes = 0;
            _.forEach(state.votes, function(candidate){
                var vote = candidate.finalVote;
                if(typeof vote === 'string'){
                    vote = parseInt(vote.replace(/,/g, ''), 10)
                    candidate.finalVote = vote;
                }
                totalVotes += vote;
            })

            // Loop for each Candidate in State   
            _.forEach(state.votes, function(candidate){

                if(candidate.id > 0){ // weed out 'Other'

                    // Color in state and count delegates
                    var foundIndex = candidates.findIndex(x => x.id == candidate.id)
                    if(foundIndex > -1){
                        candidates[foundIndex].delegates += candidate.delegates;
                        totalDelegates -= candidate.delegates;
                    }

                    // Print state's hover info table
                    if(counter < 6){
                        output += '<tr>'
                            output += '<td><span class="c' + candidate.id + '"></span>' + candidates[foundIndex].name + '</td>'
                            output += '<td>' + candidate.finalVote.toLocaleString() + '</td>'
                            output += '<td>' + (parseInt(candidate.finalVote) / totalVotes * 100).toFixed(1) + '%</td>'
                            output += '<td>' + candidate.delegates + '</td>'
                        output += '</tr>';
                    }

                    counter ++

                }
            })
            output += '</table>'

        } else{ // State is upcoming

            // Checking to see if state needs up next color
            if(!nextDone){
                if(!nextUp){
                    nextUp = true;
                    nextDate = state.date;
                } else{
                    if(nextDate != state.date){
                        nextUp = false;
                        nextDone = true;
                    }
                }
            }

            if(nextUp) $('#' + key).css({ fill: '#AAA', background: '#AAA' });
        }

        $('#' + key).attr('data-info', output);

    });

}

function printDelegateCount(){

    candidates = _.sortBy(candidates, ['delegates']).reverse();

    var output = '<table>'
    _.forEach(candidates, function(c){
        
        var barWidth = (c.delegates / needed * 100).toFixed(2);
        
        if(barWidth > 0){

            var dropped = "";
            if(c.dropped) dropped = "dropped";

            output += '<tr class="' + dropped + '"id="' + c.id + '">';
                output += '<td class="name">' + c.name + '</td>';
                output += '<td class="bar">';
                    output += '<span class="bar-number" style="left:' + barWidth + '%;">' + c.delegates + '<span class="bar-pct">(' + barWidth +  '%)</span>'+ '</span>';
                    output += '<span class="bar-color c' + c.id + '" style="width:' + barWidth + '%;"></span>';
                output += '</td>';
            output += '</tr>';
        }
    });
    output += '</table>';

    $('.delegates').html(output);

    totalDelegates = totalDelegates.toLocaleString();
    $('.delegates-left').text(totalDelegates);
}


