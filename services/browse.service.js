const xtend = require("xtend");
const {
  Record,
  Staff,
  Attachment,
  Transactions,
  Driver,
  User,
  Items,
  Delivery,
  Cafe,
  Expenses,
  Banners,
  Places,
} = require("../models");
const Utils = require("../utils");
const moment = require('moment');


module.exports.findCategories = async function findCategories(category, query) {
  const GetData = async function (Category, fields = [], populate = []) {
    const today = moment().startOf("day");
   
    // clean query, remove irrelevant props
    const q = xtend(query, {
			offset: undefined,
			limit: undefined,
			sorter: undefined,
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today).endOf("day").toDate(),
			},
		});

    const modal = Category.find(Utils.cleanObject(q))
      .skip(query.offset)
      .limit(query.limit)
      .select(fields)
      .sort([
        [
          query.sorter ? query.sorter.field : "updatedAt",
          query.sorter && /ascend/.test(query.sorter.order)
            ? "ascending"
            : "descending",
        ],
      ])
      .populate(populate);  

    const [data, total] = await Promise.all([
      modal.exec(),
      Category.countDocuments(q),
    ]);

    return { data, total };
  };

  switch (category) {
		case "staff": {
			return await GetData(Staff);
		}
		case "transactions":
			return await GetData(Transactions, [], ["user"]);

		case "expenses":
			return await GetData(Expenses, [], ["user"]);

		default: {
			return { data: [], total: 0 };
		}
	}
};

module.exports.findCategory = async function findCategories(params) {
  // const GetData = async function (Category) {
  //   const category = await Category.findById(params.id);
  //   return category;
  // };
  console.log(params);
  const GetData = async function (Category) {
    const category = await Category.find({ category: params.id });
    console.log(category, "dhhdhdddh");
    return category;
  };

  switch (params.id) {
    case "records": {
      return await GetData(Record);
    }
    case "Beverages": {
      return await GetData(Items);
    }
    case "Eats": {
      return await GetData(Items);
    }
    case "Banners": {
      return await GetData(Items);
    }
    default: {
      return {};
    }
  }
};
