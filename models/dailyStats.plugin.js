const xtend = require("xtend");
const moment = require("moment");

module.exports = function (schema) {

  schema.statics = xtend(schema.statics, {
    countPerDay: async function (query = {}) {
    
      const startOfDay = moment().startOf("day").toDate();
      const endOfDay = moment().endOf('day').toDate();


      let dailyStats = await this.aggregate([
				{
					$match: xtend(query, {
						$expr: {
							$and: [
								{ $gte: ["$createdAt", startOfDay] },
								{ $lte: ["$createdAt", endOfDay] },
							],
						},
					}),
				},
				{
					$group: {
						_id: {
							year: {
								$week: "$createdAt",
							},
							day: {
								$dayOfWeek: "$createdAt",
							},
						},
						count: { $sum: 1 },
					},
				},
				// {
				// 	$sort: {
				// 		"_id.year": 1,
				// 		"_id.day": 1,
				// 	},
				// },
			]);

      const days = [2,3,4,5,6,7,1];

      // const data = stats.map(({ _id, count }) => xtend(_id, { count }));
      const data = dailyStats.map(({ _id, count }) => xtend(_id, { count }));

      console.log(data, 'data')

      return days.map((day) => {
        console.log(day, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        
        let index = data.findIndex((item) => {
          // console.log(item.day,typeof item.day 'stat item')
          return  item.day == day
        });
          console.log(index, 'index')
        return index >= 0 ? data[index].count : 0;
      });
    },
  });
};
