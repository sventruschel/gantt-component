(() => ({
  name: 'GanttV2',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Highcharts, HighchartsGantt, HighchartsReact } = window;
    HighchartsGantt(Highcharts);
    const {
      filter,
      model,
      property,
      propertyDate,
      propertyEndDate,
      creditsText,
      creditsHref,
      aligment,
      content,
    } = options;
    const { useFilter, useAllQuery, getProperty, env } = B;
    const where = useFilter(filter);
    const isDev = env === 'dev';

    const { data } =
      model &&
      useAllQuery(model, {
        rawFilter: where,
        skip: 0,
        take: 20,
      });

    const { results } = data || {};

    const makeDataArray = input => {
      if (isDev) {
        const output = [];
        output.push({
          name: 'project',
          start: Date.UTC(2020, 1, 1),
          end: Date.UTC(2020, 5, 1),
        });
        output.push({
          name: 'project',
          start: Date.UTC(2020, 1, 20),
          end: Date.UTC(2020, 4, 12),
        });
        output.push({
          name: 'project',
          start: Date.UTC(2020, 2, 1),
          end: Date.UTC(2020, 6, 1),
        });

        return output;
      }

      if (input) {
        if (model && property && propertyDate && propertyEndDate) {
          const output = [];
          const { name: prop } = getProperty(property);
          const { name: propDate } = getProperty(propertyDate);
          const { name: propEndDate } = getProperty(propertyEndDate);

          input.forEach(item => {
            const startDate = new Date(item[propDate]);
            const endDate = new Date(item[propEndDate]);
            output.push({
              name: item[prop],
              start: Date.UTC(
                startDate.getUTCFullYear(),
                startDate.getUTCMonth(),
                startDate.getUTCDate(),
              ),
              end: Date.UTC(
                endDate.getUTCFullYear(),
                endDate.getUTCMonth(),
                endDate.getUTCDate(),
              ),
            });
          });
          return output;
        }
      }
      return null;
    };

    return (
      <div>
        <HighchartsReact
          containerProps={{ className: classes.chartContainer }}
          highcharts={Highcharts}
          constructorType="ganttChart"
          options={{
            credits: {
              text: creditsText,
              href: creditsHref,
              position: {
                align: `${aligment}`,
                x: 0,
              },
            },
            chart: {
              backgroundColor: classes.chartContainer,
            },
            yAxis: {
              grid: {},
            },
            xAxis: {
              grid: {},
            },
            series: [
              {
                name: content,
                data: makeDataArray(results),
              },
            ],
          }}
        />
      </div>
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const newStyling = new Styling(t);

    return {
      chartContainer: {
        fill: ({ options: { ganttfill } }) => [
          newStyling.getColor(ganttfill),
          '!important',
        ],
      },
    };
  },
}))();
