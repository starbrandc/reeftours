$(document).ready(function(){
// When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

// Get the navbar
    var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 424,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 762,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 1852,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 27,duration: 2500});



/* AUTHOR LINK */
 $('.about-me-img').hover(function(){
        $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
    }, function(){
        $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
    });
  
});	
///

"use strict";
$.fn.datepicker.language['en'] = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear',
  firstDay: 0 };

$.fn.breezeDatePicker = function (options) {
  if (this.prop('has_datepicker') === true) {
    return null;
  }
  this.prop('has_datepicker', true);
  options = $.extend({
    rangeMode: 'off',
    rangeModeSelection: {
      selectedMode: 'date',
      singleDateLabelText: 'Single date',
      rangeLabelText: 'Date range' },

    multiDateSeparator: ' - ',
    minDate: '1995-01-01',
    maxDate: '2022-01-01',
    timePicker: 'off',
    autoClose: null,
    periods: null,
    writeDateTo: null,
    writeStartAndEndDateTo: null,
    timeSpanSuggestion: 'PT1H',
    onChange: null // null or function (value) {  } where value will be a Date object when range mode is off, and [Date, Date] when range mode is on
  }, options);
  // set up default auto close behaviour
  // true for all non-range date pickers, false for all range and time pickers
  if (options.autoClose === null || options.autoClose === undefined) {
    options.autoClose = options.rangeMode == 'off' && options.timePicker == 'off';
  }
  var washIllegalElementIdChars = function (str) {return str.replace(/[^A-Za-z0-9_-]/g, '_');};
  var yearDropdown,monthDropdown,prevButton,nextButton,airDatePicker,airDatePickerElement,sourceElement = this,visibleSourceElementInstance,containerElement,backdropElement,timePickerContainer = null,rangeModeContainer = null,periodsContainer = null,datePickerNavigationContainer = null,uniqueKey = washIllegalElementIdChars(sourceElement.attr('id') || '') + washIllegalElementIdChars(sourceElement.attr('name') || '');
  var isRangeMode = function () {return options.rangeMode === 'on';};
  var rangeSpansTwoDates = function () {return Array.isArray(airDatePicker.selectedDates) &&
    airDatePicker.selectedDates.length === 2 && !moment(airDatePicker.selectedDates[0]).isSame(moment(airDatePicker.selectedDates[1]), 'day');};
  var showTimePicker = function () {return options.timePicker === 'on' || options.timePicker === 'userselect';};
  var updateYearAndMonthDropdowns = function () {
    var visibleDate = moment(airDatePicker.date);
    monthDropdown.val(visibleDate.get('month'));
    monthDropdown.trigger('change');
    yearDropdown.val(visibleDate.get('year'));
    yearDropdown.trigger('change');
  };
  var dateIsWithinMinMaxBoundaries = function (moment) {return moment.isBetween(options.minDate, options.maxDate, 'month', '[]');};
  var formatDateTime = function (dateTime, includeTime, withSeconds) {return includeTime ?
    withSeconds ?
    moment(dateTime).format('YYYY-MM-DD HH:mm:ss') :
    moment(dateTime).format('YYYY-MM-DD HH:mm') :
    moment(dateTime).format('YYYY-MM-DD');};
  var formatDateRange = function (dates, includeTime) {return includeTime ?
    moment(dates[0]).format('YYYY-MM-DD HH:mm') + options.multiDateSeparator + moment(dates[1]).format('YYYY-MM-DD HH:mm') :
    moment(dates[0]).format('YYYY-MM-DD') + options.multiDateSeparator + moment(dates[1]).format('YYYY-MM-DD');};
  var getSelectedStartTimeAsMomentDuration = function () {
    var hourString = timePickerContainer.find('.time-wrapper:first input[type=number]')[0].value;
    var minuteString = timePickerContainer.find('.time-wrapper:first input[type=number]')[1].value;
    var hours = parseInt(hourString) || 0;
    var minutes = parseInt(minuteString) || 0;
    return moment.duration(hours, 'hours').add(minutes, 'minutes');
  };
  var getSelectedEndTimeAsMomentDuration = function () {
    var hourString = timePickerContainer.find('.time-wrapper:last input[type=number]')[0].value;
    var minuteString = timePickerContainer.find('.time-wrapper:last input[type=number]')[1].value;
    var hours = parseInt(hourString) || 0;
    var minutes = parseInt(minuteString) || 0;
    return moment.duration(hours, 'hours').add(minutes, 'minutes');
  };
  /**
       * Returns an array of two dates, or false if not parsable
       */
  var convertDurationStringToDates = function (durationString) {
    var startDate, endDate;
    var startInclusion = durationString.slice(0, 1);
    var endInclusion = durationString.slice(-1);
    var duration = moment.duration(durationString.slice(1, -1));
    if (!moment.isDuration(duration) || duration.as('seconds') === 0) {
      console.log('Not a valid duration');
      return false;
    }
    if (moment(duration).isBefore(moment())) {
      startDate = moment().add(duration);
      endDate = moment();
    } else
    {
      startDate = moment();
      endDate = moment().add(duration);
    }
    // Snap to whole days
    if (startInclusion === '[') {
      startDate = startDate.startOf('day');
    } else
    if (startInclusion === '(') {
      startDate = startDate.startOf('day').add(1, 'days');
    }
    if (endInclusion === ']') {
      endDate = endDate.add(1, 'days').startOf('day');
    } else
    if (endInclusion === ')') {
      endDate = endDate.startOf('day');
    }
    return [startDate.toDate(), endDate.toDate()];
  };
  var applyDurationToDatePicker = function (durationString) {
    var dates = durationString.indexOf('|') > -1 ?
    durationString.split('|').map(function (x) {return moment(x).toDate();}) :
    convertDurationStringToDates(durationString);
    if (!dates) {
      // Not a valid duration
      return false;
    }
    airDatePicker.date = moment().toDate();
    airDatePicker.clear();
    airDatePicker.clear();
    airDatePicker.selectDate(dates[0]);
    airDatePicker.selectDate(dates[1]);
    return true;
  };
  var serializeValues = function (dateValues, serializedDateRange) {
    if (showTimePicker()) {
      dateValues[0] = moment(dateValues[0]).set({ 'hour': 0, 'minute': 0, 'second': 0 }).add(getSelectedStartTimeAsMomentDuration()).toDate();
      if (dateValues.length > 1) {
        dateValues[1] = moment(dateValues[1]).set({ 'hour': 0, 'minute': 0, 'second': 0 }).add(getSelectedEndTimeAsMomentDuration()).toDate();
      }
    }
    var serialized = isRangeMode() ?
    typeof serializedDateRange === "string" ?
    serializedDateRange :
    Array.isArray(dateValues) && dateValues.length === 2 ?
    formatDateRange(dateValues, showTimePicker()) :
    null :
    dateValues[0] && moment(dateValues[0]).isValid() ?
    formatDateTime(dateValues[0], showTimePicker(), false) :
    null;
    if (serialized) {
      visibleSourceElementInstance.val(serialized);
      if (Array.isArray(options.writeStartAndEndDateTo) && options.writeStartAndEndDateTo.length === 2) {
        if (isRangeMode()) {
          $(options.writeStartAndEndDateTo[0]).val(dateValues[0] && formatDateTime(dateValues[0], true, true) || '');
          $(options.writeStartAndEndDateTo[1]).val(dateValues[1] && formatDateTime(dateValues[1], true, true) || '');
          options.onChange && options.onChange([dateValues[0], dateValues[1]]);
        } else
        {
          // Clear the hiddens when not in range mode
          $(options.writeStartAndEndDateTo[0]).val('');
          $(options.writeStartAndEndDateTo[1]).val('');
        }
      }
      if (options.writeDateTo) {
        if (isRangeMode()) {
          // Clear the hidden when in range mode
          $(options.writeDateTo).val('');
        } else
        {
          $(options.writeDateTo).val(formatDateTime(dateValues[0], true, true));
          options.onChange && options.onChange(dateValues[0]);
        }
      }
      updateTimePickerDateLabels();
      sourceElement.trigger('change');
      return true;
    }
    return false;
  };
  var serializeCurrentlySelectedValues = function (serializedDateRange) {
    if (visibleSourceElementInstance.prop('terminated') === true) {
      return false;
    }
    var dateValues = airDatePicker.selectedDates;
    return serializeValues(dateValues, serializedDateRange);
  };
  var trySelectPeriodFromValue = function (serialized) {
    for (var periodKey in options.periods) {
      if (options.periods.hasOwnProperty(periodKey)) {
        if (serialized === periodKey || serialized === options.periods[periodKey]) {
          periodsContainer.find("input[value=\"" + periodKey + "\"]").attr('checked', true);
          containerElement.find('.datepicker-inline').hide();
          datePickerNavigationContainer.hide();
          timePickerContainer.hide();
          applyDurationToDatePicker(periodKey);
          serializeCurrentlySelectedValues(options.periods[periodKey]);
          return true;
        }
      }
    }
    return false;
  };
  var timeTextBoxKeyUp = function (event) {
    // We only want to jump to next if a number was pressed
    if (event.keyCode < 48 || event.keyCode > 57) {
      return true;
    }
    var sourceTextBox = $(event.target);
    if (sourceTextBox.val().length === 1) {
      var next_1 = sourceTextBox.next('input[type=number]');
      if (next_1.length === 0) {
        next_1 = sourceTextBox.parent().nextAll('.time-wrapper').find('input[type=number]:first');
      }
      if (next_1.length > 0) {
        setTimeout(function () {return next_1.select();}, 10);
      }
    }
    return true;
  };
  var formatTimeWithPadding = function () {
    var hourBox = timePickerContainer.find('.time-wrapper:first input[type=number]')[0];
    var minuteBox = timePickerContainer.find('.time-wrapper:first input[type=number]')[1];
    hourBox.value = ('00' + hourBox.value).slice(-2);
    minuteBox.value = ('00' + minuteBox.value).slice(-2);
    hourBox = timePickerContainer.find('.time-wrapper:last input[type=number]')[0];
    minuteBox = timePickerContainer.find('.time-wrapper:last input[type=number]')[1];
    hourBox.value = ('00' + hourBox.value).slice(-2);
    minuteBox.value = ('00' + minuteBox.value).slice(-2);
  };
  var enableTimePicker = function (enabled) {
    if (enabled) {
      timePickerContainer.removeClass('disabled');
      timePickerContainer.find('input[type=number]').removeAttr('disabled');
      timePickerContainer.find('input[type=checkbox]').attr('checked', 'checked');
    } else
    {
      timePickerContainer.addClass('disabled');
      timePickerContainer.find('input[type=number]').attr('disabled', 'disabled');
      timePickerContainer.find('input[type=checkbox]').removeAttr('checked');
    }
  };
  var populateFromSerializedValue = function () {
    var serialized = visibleSourceElementInstance.val();
    airDatePicker.clear();
    airDatePicker.clear(); // Seems to be bug in v2.1.0 of air datepicker that clear() only removes one selected date
    if (options.periods && trySelectPeriodFromValue(serialized)) {
      return;
    }
    if (isRangeMode()) {
      airDatePicker.update('range', true);
      var dateStrings = serialized.split(options.multiDateSeparator);
      var dates = [];
      var startDate = moment(dateStrings[0].trim());
      if (startDate.isValid()) {
        timePickerContainer.find('.time-wrapper:first input[type=number]')[0].value = startDate.get('hour');
        timePickerContainer.find('.time-wrapper:first input[type=number]')[1].value = startDate.get('minute');
        dates.push(startDate);
      }
      if (dateStrings.length === 2) {
        var endDate = moment(dateStrings[1].trim());
        if (endDate.isValid()) {
          timePickerContainer.find('.time-wrapper:last input[type=number]')[0].value = endDate.get('hour');
          timePickerContainer.find('.time-wrapper:last input[type=number]')[1].value = endDate.get('minute');
          dates.push(endDate);
        }
      }
      if (dates.length === 2 && dateIsWithinMinMaxBoundaries(dates[0]) && dateIsWithinMinMaxBoundaries(dates[1])) {
        // If a period was clicked, leave that checked
        if (periodsContainer == null || periodsContainer.has(':checked').length === 0) {
          airDatePicker.selectDate(dates[0].toDate());
          airDatePicker.selectDate(dates[1].toDate());
          airDatePicker.date = dates[0].toDate();
          if (rangeModeContainer) {
            rangeModeContainer.find('input[value="range"]').attr('checked', true);
          }
          containerElement.find('.datepicker-inline').show();
          datePickerNavigationContainer.show();
        }
      } else
      {
        // One or both date strings are incorrect
        console.log('One or both date strings are incorrect');
      }
    } else
    {
      airDatePicker.update('range', false);
      var date = moment(serialized);
      if (!date.isValid() || !dateIsWithinMinMaxBoundaries(date)) {
        return;
      }
      timePickerContainer.find('input[type=number]')[0].value = date.get('hour');
      timePickerContainer.find('input[type=number]')[1].value = date.get('minute');
      enableTimePicker(options.timePicker === 'on' || date.isValid() && (date.get('hour') > 0 || date.get('minute') > 0));
      var dateWithoutTime = date.set({ 'hour': 0, 'minute': 0, 'second': 0 }).toDate();
      airDatePicker.selectDate(dateWithoutTime);
      airDatePicker.date = dateWithoutTime;
    }
    formatTimeWithPadding();
    updateTimePickerDateLabels();
  };
  var createElements = function () {
    containerElement = $('<div class="breeze-datepicker"/>');
    backdropElement = $('<div class="breeze-datepicker-backdrop"/>');
    // Periods container
    if (options.periods) {
      periodsContainer = $('<div class="periods"/>');
      for (var periodKey in options.periods) {
        periodsContainer.append($("<div class=\"period\"><input type=\"radio\" id=\"" + uniqueKey + "_" + washIllegalElementIdChars(periodKey) + "\" name=\"" + uniqueKey + "_rangemode\" value=\"" + periodKey + "\"/><label for=\"" + uniqueKey + "_" + washIllegalElementIdChars(periodKey) + "\">" + options.periods[periodKey] + "</label></div>"));
      }
      containerElement.append(periodsContainer);
      rangeModeContainer = $('<div class="range-mode"/>');
      rangeModeContainer.append($("<div><input type=\"radio\" id=\"" + uniqueKey + "_range\" name=\"" + uniqueKey + "_rangemode\" value=\"range\"/><label for=\"" + uniqueKey + "_range\">" + options.rangeModeSelection.rangeLabelText + "</label></div>"));
      containerElement.append(rangeModeContainer);
    }
    // Month/year navigation
    datePickerNavigationContainer = $('<div class="datepicker-navigation"/>');
    prevButton = $('<a class="back-button"></a>');
    datePickerNavigationContainer.append(prevButton);
    var dropdownsContainer = $('<div class="dropdowns-container" />');
    monthDropdown = $('<select class="month"><option value="0">January</option><option value="1">February</option><option value="2">March</option><option value="3">April</option><option value="4">May</option><option value="5">June</option><option value="6">July</option><option value="7">August</option><option value="8">September</option><option value="9">October</option><option value="10">November</option><option value="11">December</option></select>');
    dropdownsContainer.append(monthDropdown);
    monthDropdown.select2();
    yearDropdown = $('<select class="year"></select>');
    var minYear = moment(options.minDate).get('year'),maxYear = moment(options.maxDate).get('year'),yr = minYear;
    while (yr <= maxYear) {if (window.CP.shouldStopExecution(0)) break;
      yearDropdown.append($('<option value="' + yr + '">' + yr + '</option>'));
      yr++;
    }window.CP.exitedLoop(0);
    dropdownsContainer.append(yearDropdown);
    yearDropdown.select2();
    datePickerNavigationContainer.append(dropdownsContainer);
    nextButton = $('<a class="next-button"></a>');
    datePickerNavigationContainer.append(nextButton);
    containerElement.append(datePickerNavigationContainer);
    // Air datepicker
    airDatePickerElement = $('<input type="hidden"/>');
    containerElement.append(airDatePickerElement);
    // Time picker
    timePickerContainer = $('<div class="timepicker-container"></div>');
    timePickerContainer.append($('<span class="time-wrapper"><h3 class="date-label">2016-04-01</h3><input type="number" step="1" min="0" max="23" class="suppress-navigation" value="00"/>:<input type="number" step="5" min="0" max="59" class="suppress-navigation" value="00"/></span>'));
    timePickerContainer.append($('<span class="time-separator">to</span>'));
    timePickerContainer.append($('<span class="time-wrapper"><h3 class="date-label">2016-04-01</h3><input type="number" step="1" min="0" max="23" class="suppress-navigation" value="00"/>:<input type="number" step="5" min="0" max="59" class="suppress-navigation" value="00"/></span>'));
    containerElement.append(timePickerContainer);
    containerElement.insertAfter(sourceElement);
    backdropElement.insertBefore(containerElement);
  };
  var tryGoForward = function () {
    if (dateIsWithinMinMaxBoundaries(moment(airDatePicker.date).add(1, 'month'))) {
      airDatePicker.next();
      updateYearAndMonthDropdowns();
    }
  };
  var tryGoBack = function () {
    if (dateIsWithinMinMaxBoundaries(moment(airDatePicker.date).subtract(1, 'month'))) {
      airDatePicker.prev();
      updateYearAndMonthDropdowns();
    }
  };
  var keypressListener = function (event) {
    switch (event.keyCode) {
      case 27: // Escape
        visibleSourceElementInstance.prop('terminated', true);
        hide();
        break;
      case 13: // Enter
        hide();
        break;
      case 37: // Left
        if (!$(event.target).hasClass('suppress-navigation')) {
          tryGoBack();
          event.preventDefault();
        }
        break;
      case 39: // Right
        if (!$(event.target).hasClass('suppress-navigation')) {
          tryGoForward();
          event.preventDefault();
        }
        break;}

  };
  var updateRangeModeRadios = function () {
    if (options.periods) {
      return;
    }
    if (isRangeMode()) {
      rangeModeContainer && rangeModeContainer.find("#" + uniqueKey + "_range").prop('checked', true);
    } else
    {
      rangeModeContainer && rangeModeContainer.find("#" + uniqueKey + "_date").prop('checked', true);
    }
  };
  var updateTimePickerDateLabels = function () {
    if (isRangeMode()) {
      if (Array.isArray(airDatePicker.selectedDates) && airDatePicker.selectedDates.length === 2) {
        timePickerContainer.find('.time-wrapper:first .date-label').text(moment(airDatePicker.selectedDates[0]).format('YYYY-MM-DD'));
        timePickerContainer.find('.time-wrapper:last .date-label').text(moment(airDatePicker.selectedDates[1]).format('YYYY-MM-DD'));
      }
    } else
    {
      if (typeof airDatePicker.selectedDates === 'object') {
        timePickerContainer.find('.time-wrapper:first .date-label').text(moment(airDatePicker.selectedDates).format('YYYY-MM-DD'));
      }
    }
  };
  var updateTimePickerDateLabelsVisibility = function () {
    if (isRangeMode() && rangeSpansTwoDates()) {
      timePickerContainer.addClass('is-different-dates');
    } else
    {
      timePickerContainer.removeClass('is-different-dates');
    }
  };
  var applySuggestedTimeSpanToSecondTimePicker = function (event) {
    var sourceTextBox = $(event.target);
    var isMinuteBoxOfStartTime = sourceTextBox.parent().is('.time-wrapper:first-child') && sourceTextBox.is('input[type=number]:last-child');
    if (isMinuteBoxOfStartTime && options.timeSpanSuggestion) {
      var startHour = parseInt(timePickerContainer.find('.time-wrapper:first input[type=number]:first').val() || '0');
      var startMinute = parseInt(timePickerContainer.find('.time-wrapper:first input[type=number]:last').val() || '0');
      var endHour = parseInt(timePickerContainer.find('.time-wrapper:last input[type=number]:first').val() || '0');
      var endMinute = parseInt(timePickerContainer.find('.time-wrapper:last input[type=number]:last').val() || '0');
      // Only apply suggestion if end time isn't set
      if (endHour === 0 && endMinute === 0) {
        var startTime = moment().set({
          hour: startHour,
          minute: startMinute });

        var endTime = startTime.add(moment.duration(options.timeSpanSuggestion));
        timePickerContainer.find('.time-wrapper:last input[type=number]:first').val(endTime.hours());
        timePickerContainer.find('.time-wrapper:last input[type=number]:last').val(endTime.minutes());
      }
    }
  };
  var ensureContainerVisibleBounds = function () {
    var containerHeight = containerElement.outerHeight(),scrollTop = $(document).scrollTop(),doc = $(document),sourceElementDistanceToTopVisibleBound = visibleSourceElementInstance.offset().top,sourceElementDistanceToBottomVisibleBound = doc.innerHeight() - (sourceElementDistanceToTopVisibleBound + visibleSourceElementInstance.outerHeight()),sourceElementDistanceToPageTop = visibleSourceElementInstance.position().top + scrollTop,sourceElementDistanceToPageLeftEnd = visibleSourceElementInstance.position().left;
    if (containerHeight > sourceElementDistanceToBottomVisibleBound && containerHeight < sourceElementDistanceToTopVisibleBound) {
      // Container doesn't fit below, but fits above.
      containerElement.css('top', sourceElementDistanceToPageTop - containerHeight + "px");
    } else
    {
      // Position container just below the source element.
      containerElement.css('top', sourceElementDistanceToPageTop + visibleSourceElementInstance.outerHeight() + "px");
    }
    containerElement.css('left', sourceElementDistanceToPageLeftEnd + "px");
  };
  var show = function (e) {
    visibleSourceElementInstance = $(e.target);
    visibleSourceElementInstance.prop('terminated', false);
    if (containerElement.is(':visible')) {
      return;
    }
    populateFromSerializedValue();
    updateRangeModeRadios();
    updateYearAndMonthDropdowns();
    if (options.periods) {
      rangeModeContainer && rangeModeContainer.show();
    } else
    {
      rangeModeContainer && rangeModeContainer.hide();
    }
    if (isRangeMode()) {
      timePickerContainer.addClass('is-range-mode');
    } else
    {
      timePickerContainer.removeClass('is-range-mode');
    }
    if (showTimePicker()) {
      timePickerContainer.show();
    } else
    {
      timePickerContainer.hide();
    }
    ensureContainerVisibleBounds();
    updateTimePickerDateLabelsVisibility();
    containerElement.fadeIn(200);
    backdropElement.fadeIn(200);
    $(document).on('keydown', keypressListener);
  };
  var hide = function () {
    containerElement.fadeOut(200);
    backdropElement.fadeOut(200);
    $(document).off('keydown', keypressListener);
  };
  var init = function () {
    createElements();
    monthDropdown.change(function () {
      var monthString = $(this).val();
      var selectedDate = moment(airDatePicker.date);
      var newMonth = parseInt(monthString);
      var updatedDate = selectedDate.set('month', newMonth);
      airDatePicker.date = updatedDate.toDate();
    });
    yearDropdown.change(function () {
      var yearString = $(this).val();
      var selectedDate = moment(airDatePicker.date);
      var newYear = parseInt(yearString);
      var updatedDate = selectedDate.set('year', newYear);
      airDatePicker.date = updatedDate.toDate();
    });
    nextButton.mousedown(tryGoForward);
    prevButton.mousedown(tryGoBack);
    sourceElement.focus(show);
    sourceElement.click(show);
    backdropElement.click(hide);
    if (options.periods && rangeModeContainer) {
      rangeModeContainer.on('change', 'input[type=radio]', function (event) {
        var radio = $(event.target);
        if (radio.prop('checked')) {
          var rangeSelected = radio.val() === 'range';
          airDatePicker.update('range', rangeSelected);
          var currentValueIsARange = Array.isArray(airDatePicker.selectedDates) &&
          airDatePicker.selectedDates.length === 2;
          // If selected date is a range and selected rangemode is single (or vice versa), clear the picker
          if (isRangeMode() !== currentValueIsARange) {
            airDatePicker.clear();
            airDatePicker.clear();
          }
        }
        containerElement.find('.datepicker-inline').show();
        datePickerNavigationContainer.show();
        if (showTimePicker()) {
          timePickerContainer.show();
        } else
        {
          timePickerContainer.hide();
        }
      });
    }
    if (options.periods) {
      periodsContainer.on('change', 'input[type=radio]', function (event) {
        // Hide evertyhing beneath radio buttons
        containerElement.find('.datepicker-inline').hide();
        datePickerNavigationContainer.hide();
        timePickerContainer.hide();
        if (options.autoClose) {
          hide();
        }
        applyDurationToDatePicker($(this).val());
        serializeCurrentlySelectedValues(options.periods[$(this).val()]);
      });
    }
    airDatePicker = airDatePickerElement.datepicker({
      language: 'en',
      dateFormat: 'yyyy-mm-dd',
      minDate: moment(options.minDate).toDate(),
      maxDate: moment(options.maxDate).toDate(),
      range: isRangeMode(),
      inline: true,
      multipleDatesSeparator: options.multiDateSeparator,
      onSelect: function (formattedDate, date, instance) {
        if (!date) {
          return;
        }
        var serializationSuccessful = serializeCurrentlySelectedValues();
        if (serializationSuccessful) {
          timePickerContainer.find('input[type=number]:first').select();
        }
        if (serializationSuccessful && options.autoClose && !showTimePicker()) {
          hide();
        }
        updateTimePickerDateLabelsVisibility();
      } }).
    data('datepicker');
    timePickerContainer.find('input[type=number]').on('blur', function (event) {
      applySuggestedTimeSpanToSecondTimePicker(event);
      formatTimeWithPadding();
    });
    timePickerContainer.find('input[type=number]').on('keypress', timeTextBoxKeyUp);
    timePickerContainer.find('input[type=number]').on('change', serializeCurrentlySelectedValues);
    timePickerContainer.find('input[type=number]').focus(function (event) {
      setTimeout(function () {return $(event.target).select();}, 10);
    });
    timePickerContainer.hide();
  };
  init();
  return {
    reset: function () {
      // Reset any state needed for the datepicker to become pristine. Currently the only thing is uncheck all periods.
      periodsContainer.find('input').removeAttr('checked');
    },
    update: function (option, value) {
      options[option] = value;
      switch (option) {
        case 'multiDateSeparator':
          airDatePicker.update('multipleDatesSeparator', isRangeMode());
          break;
        case 'rangeMode':
          airDatePicker.update('range', isRangeMode());
          break;
        case 'timePicker':
          break;
        case 'rangeModeSelection':
          break;
        case 'minDate':
        case 'maxDate':
          if (value instanceof Date) {
            airDatePicker.update(option, value);
          } else
          if (typeof value === 'string') {
            airDatePicker.update(option, moment(value).toDate());
          }
          break;}

    } };

};
$('#selected-date').breezeDatePicker({
  showPresets: true,
  rangeMode: 'userselect',
  rangeModeSelection: {
    singleDateLabelText: 'On a specific date',
    rangeLabelText: 'Within a date period' },

  autoClose: false,
  timePicker: 'on' });
