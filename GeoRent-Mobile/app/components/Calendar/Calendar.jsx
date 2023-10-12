/* eslint-disable camelcase */
import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getDatesRange } from '../../helpers/getDatesRange';
import { styles } from './Calendar.styles';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'es';

export function CalendarComponent({ reservations }) {
  const markedDates = {};
  const today = new Date().toISOString().split('T')[0];

  reservations.forEach((reservation) => {
    const { initial_day, last_day } = reservation;
    const startDate = initial_day.split('T')[0];
    const endDate = last_day.split('T')[0];
    const range = getDatesRange(startDate, endDate);

    range.forEach((date) => {
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: '#2573DA',
            borderRadius: 10,
            opacity: 0.5,
          },
          text: {
            fontWeight: 'bold',
          },
        },
      };
    });
  });
  // eslint-disable-next-line no-prototype-builtins
  const isPropertyAvailableToday = !markedDates.hasOwnProperty(today);
  return (
    <View style={styles.calendarComponent}>
      <Text style={styles.Title}>Calendario</Text>
      <Calendar
        markedDates={markedDates}
        markingType="custom"
        renderDot={() => <View style={{ width: 8, height: 8, borderRadius: 4 }} />}
      />
      {isPropertyAvailableToday ? (
        <Text style={styles.calendarText}>La propiedad está disponible para hoy.</Text>
      ) : (
        <Text style={styles.calendarText}>La propiedad no está disponible para hoy.</Text>
      )}
    </View>
  );
}

CalendarComponent.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      post: PropTypes.number,
      initial_day: PropTypes.string,
      last_day: PropTypes.string,
    }),
  ).isRequired,
};
