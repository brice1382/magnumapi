function sonUpload() {

    var files = document.getElementById('selectFiles').files;
    console.log(files);
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function sort(oData) {
        var result = JSON.parse(oData.target.result);
        var data = result[0].event;

        console.log(result);
        var fdata = new Array();

        _.forEach(data, function (d) {

            // convert last epoch date for search
            var dateVal = d.query.id.slice(-1)[0];
            dateVal = dateVal ? dateVal.timestamp_usec : 0;
            var date = new Date(0);
            date.setUTCSeconds(Math.ceil(dateVal / 1000000));

            // push result to formatted data
            fdata.push({'epoch': dateVal, 'date': date, 'query': d.query.query_text});
        });

        // sort date ascending
        var fdataSorted = _.sortBy(fdata, 'epoch');


        // clear console
        console.clear();

        // print to console
        _.forEach(fdataSorted, function (d) {
            document.getElementById('searches').appendChild(document
                .createTextNode('SEARCH DATE: ' + d.date + '\n' + 'SEARCH TEXT: ' + '"' + d.query + '"' + '\n\n'));

            console.log(d.date, d.query);
        });
    };

    fr.readAsText(files.item(0));
}