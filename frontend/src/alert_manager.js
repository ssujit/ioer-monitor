//leave function
//ToDo noch auf EN umschreiben
const alert_manager= {
    leaveESCInfo: function () {
        swal({
            title: "Verlassen Sie die Funktion mit ESC"
        });
    },
    alertUpdate: function (version) {
        swal({
                title: "Die Anwendung wurde aktualisiert",
                text: '',
                type: "info",
                html: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    localStorage.setItem("v", version);
                    location.reload(true);
                }
            }
        );
    },
    alertNoIndicatorChosen:function(){
        setTimeout(function(){
            swal(
                "Kein Indikator gewählt",
                "Bitte wählen Sie erst einen Indikator aus",
                "info"
            )
        },500);
    },
    alertError:function(){
        setTimeout(function(){
            swal(
                "Es ist ein Problem aufgetreten",
                "Bitte versuchen Sie es später nochmal oder kontaktieren Sie uns über das Feedback Formular.",
                "error"
            );
            progressbar.remove();
        },500);
    },
    alertOneTimeShift:function(){
        $.when(
            setTimeout(function(){
                swal({
                    title: "Der Indikator steht nur für den Zeitschnitt " + zeit_slider.getTimeSet() + " zur Verfügung.",
                    text: "Aus diesem Grund entfällt der Zeitslider.",
                    type: "info"
                });
            },500));
    },
    alertNotInTimeShift:function(){
        setTimeout(function () {
            swal(
                'Der Indikator ist im gewählten Zeitschnitt nicht vorhanden',
                'Für den Indikator ' + $('#Indikator option:selected').text() + ' wurde das Jahr auf ' + Math.max.apply(Math, indikatorauswahl.getFilteredPossibleYears()) + ' angepasst',
                'success'
            );
        }, 500);
    },
    alertNotinSpatialRange:function(raumglTXT,selection){
        $.when(raumgliederung.removeParameter())
            .then(progressbar.remove())
            .then(setTimeout(function () {
                swal({
                        title: 'Der Indikator ist in der gewählten Raumgliederung nicht vorhanden.',
                        text: 'Es wäre möglich den Indikator auf die Raumgliederung ' + raumglTXT + ' anzupassen',
                        type: 'info',
                        cancelButtonText: "Abbrechen",
                        showCancelButton: true,
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            $.when(gebietsauswahl.removeParamter())
                                .then(raeumliche_analyseebene.updateParamter(selection))
                                .then(gebietsauswahl.clear())
                                .then(raumgliederung.hide())
                                .then(indikator_json.init(selection));
                        }
                    }
                );
            }, 500));
    },
    alertNotAsRaster:function(){
        $.when(setTimeout(function(){
            swal({
                    title: "Der Indikator ist nicht in der Räumlichen Gliederung verfügbar",
                    type: "warning",
                    cancelButtonText: "Abbrechen",
                    showCancelButton: false,
                }
            );
        },500));
    },
    alertServerlast:function(choice){
        setTimeout(function(){
            swal({
                    title: "Erhöhte Belastung",
                    text: "Bei der jetzigen Auswahl wird eine erhöhte Rechenlast an den Browser und unserem Server gestellt, deshalb kann es zu Verzögerungen bei den Interaktionen kommen. " +
                        "Sie können durch eine Verfeinerung ihrer Auswahl, wie beispielsweise die Wahl eines Bundeslandes den Prozess beschleunigen.",
                    type: "warning",
                    cancelButtonText: "Abbrechen",
                    showCancelButton: true,
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $.when(raeumliche_analyseebene.updateParamter(choice))
                            .then($('#dropdown_datenalter').hide())
                            .then(indikator_json.init())
                            .then(right_view.close());
                    }else{
                        $('#'+raeumliche_analyseebene.getSelectionId()+"_raumgl").prop("selected",true);
                    }
                }

            )
        },500);
    },
    alertIE:function() {
        $('#Modal').remove();
        $('head').append('<style>.swal-overlay{background-color: lightgray}</style>')
        swal({
            title: '<img src="frontend/assets/icon/worldwide.png"/>',
            text: 'Ihr Browser wird nicht unterstützt, bitte verwendet Sie einen aktuellen Browser wie <b><a href="https://www.mozilla.org/de/firefox/new/" target="_blank">' +
                  'Firefox</a></b> oder <b><a href="https://www.google.com/intl/de_ALL/chrome/" target="_blank">Chrome</a></b>',
            html:true,
            showCancelButton: false,
            showConfirmButton: false
        });
    }
};
