(() => ({
  name: 'Gantt',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Highcharts, HighchartsGantt, HighchartsReact } = window;
    HighchartsGantt(Highcharts);
    const {
      content,
      propertyDate,
      propertyEndDate,
      model,
      filter,
      property,
      creditsText,
      aligment,
      caption,
      aligmentcaption,
    } = options;
    const { useText, GetAll, getProperty, env } = B;
    const isDev = env === 'dev';

    const prodCanvas = (
      <>
        <GetAll modelId={model} filter={filter} skip={0} take={30}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading....</span>;
            }
            if (error) {
              return <span>Something went wrong: {error.message} :</span>;
            }

            const { results } = data;
            const { name: prop } = getProperty(property);
            const { name: propDate } = getProperty(propertyDate);
            const { name: propEndDate } = getProperty(propertyEndDate);

            const makeDataArray = input => {
              const output = [];
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
            };

            return (
              <div>
                <ul>
                  <HighchartsReact
                    containerProps={{ className: classes.chartContainer }}
                    highcharts={Highcharts}
                    constructorType="ganttChart"
                    options={{
                      credits: {
                        text: useText(creditsText),
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
                          name: useText(content),
                          data: makeDataArray(results),
                        },
                      ],
                      caption: {
                        text: useText(caption),
                        align: `${aligmentcaption}`,
                        x: 0,
                        y: 0,
                      },
                    }}
                  />
                </ul>
              </div>
            );
          }}
        </GetAll>
      </>
    );

    const HighCharts = (
      <HighchartsReact
        containerProps={{
          className: classes.chartContainer,
        }}
        highcharts={Highcharts}
        constructorType="ganttChart"
        options={{
          credits: {
            text: useText(creditsText),
            position: {
              align: `${aligment}`,
              x: 0,
            },
          },
          chart: {
            backgroundColor: classes.chartContainer,
          },
          series: [
            {
              name: 'Projects',
              data: [
                {
                  name: 'Project 1',
                  start: Date.UTC(2021, 10, 1),
                  end: Date.UTC(2021, 10, 25),
                },
                {
                  name: 'Project 2',
                  start: Date.UTC(2021, 10, 26),
                  end: Date.UTC(2021, 11, 21),
                },
                {
                  name: 'Project 3',
                  start: Date.UTC(2021, 11, 22),
                  end: Date.UTC(2022, 0, 7),
                },
              ],
            },
          ],
          caption: {
            text: useText(caption),
            align: `${aligmentcaption}`,
            x: 0,
            y: 0,
          },
        }}
      />
    );

    const devCanvas = (
      <div>
        <ul>{HighCharts}</ul>
      </div>
    );

    if (!isDev) {
      if (model) {
        if (propertyDate) {
          if (propertyEndDate) {
            return prodCanvas;
          }
        }
      }
    }
    return devCanvas;
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
