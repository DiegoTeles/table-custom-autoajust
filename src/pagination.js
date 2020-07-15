import React, { useState, useEffect } from "react";

import TableCustom from "./table";
export default function Pagination() {
  const mock = {
    coverage: [
 {
   id: '01',
        postalCodeStart: "04113000",
        postalCodeEnd: "04213000",
        region: "Rio de Janeiro",
        carriers: [
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Loggi"
            },
            position: 1
          },
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Ame"
            },
            position: 2
          }
        ]
      },{
        id: '02',
        postalCodeStart: "04113000",
        postalCodeEnd: "04213000",
        region: "São Paulo",
        carriers: [
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Loggi"
            },
            position: 1
          },
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Ame"
            },
            position: 2
          }
        ]
      },{
        id: '03',
        postalCodeStart: "04113000",
        postalCodeEnd: "04213000",
        region: "São Paulo",
        carriers: [
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Loggi"
            },
            position: 1
          },
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Ame"
            },
            position: 2
          }
        ]
      },
      {
        id: '04',
        postalCodeStart: "04113000",
        postalCodeEnd: "04213000",
        region: "São Paulo",
        carriers: [
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Direct"
            },
            position: 1
          }
        ]
      },
      {
        id: '05',
        postalCodeStart: "04113000",
        postalCodeEnd: "04213000",
        region: "São Paulo",
        carriers: [
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Direct"
            },
            position: 1
          },
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Loggi"
            },
            position: 2
          },
          {
            carrier: {
              cnpj: "1234567891011",
              name: "Ame"
            },
            position: 3
          }
        ]
      }
    ],
    pagination: {
      size: 10,
      totalElements: 8,
      totalPages: 1,
      number: 0
    }
  };
  const [list, setList] = useState(mock);
  const [params, setParams] = useState({
    filter: null,
    pagination: null
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = param => {
    //setList(mock);
    setParams(params => ({
      ...params,
      pagination: mock.pagination
    }));
  };

  const handleChange = dataSet => handleChangeParams("pagination", dataSet);

  const handleChangeParams = (label, data, avoidListRequest = false) => {

    const p = {
      ...params,
      [label]: {
        ...params[label],
        ...data
      }
    };

    setParams(p);

    getList({
      ...{
        size: p.pagination.size,
        page: p.pagination.number
      }
    });
  };

  return (
    <>
    <TableCustom
      list={list}
      pagination={params.pagination}
      onChange={handleChange}
    />
    </>
  );
}
