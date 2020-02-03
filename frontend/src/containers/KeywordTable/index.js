import { gql } from "apollo-boost";
import { withApollo } from "react-apollo";
import React, { useState } from "react";
import TableRow from "../../components/TableRow";
import "./index.css";

const App = ({ client }) => {
  // state for keyWordObject that contains all keyword categories and keywords
  const [keyWordObject, modifyKeywordObject] = useState({});
  // state for category name
  const [categoryName, updateCategoryName] = useState("");

  const addKeyWordType = () => {
    // fetch all the keywords which are related to searched category
    client.query({
      query: gql`{keywords(match: "${categoryName}", filter: 10, order: "ASC") {
        word,
      }}`,
    }).then(({data : { keywords }}) => {
      const keyWordObjectVar = Object.assign( {}, keyWordObject);
      // filter word key
      const keywordsFiltered = keywords.map(keyword => keyword.word);
      keyWordObjectVar[categoryName] = keywordsFiltered;
      modifyKeywordObject(keyWordObjectVar);
      //empty category name to disable the button
      updateCategoryName("");
    })
  };
  return (
    <div className="keyword-container">
      <input
        placeholder="Add Category Name"
        className="input"
        type="text"
        value={categoryName}
        onChange={({ target: { value } }) => updateCategoryName(value)}
      />
      <button
        disabled={!categoryName.length}
        className="add-category"
        onClick={() => addKeyWordType()}
      >
        Add Category
      </button>
      <div className="table-wrapper">
        <table className="keywords-table">
          <thead className="table-head">
            <tr>
              <th className="headers">Categories</th>
              <th className="headers">Keywords</th>
              <th className="headers">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(keyWordObject).map((objectKey, index) => (
              <TableRow
                key={index.toString()}
                keyWordObject={keyWordObject}
                columnName={objectKey}
                modifyKeywordObject={modifyKeywordObject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withApollo(App);
