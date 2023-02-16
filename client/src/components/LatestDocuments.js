import React from 'react';
import './LatestDocuments.css';

const LatestDocuments = () => {
    return (
      <div className="latest-documents">
        <h2>Latest Documents</h2>
        <table>
          <thead>
            <tr>
              <th>Dokumentti</th>
              <th>Käsittelijä</th>
              <th>Muokattu</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>Document 1</td>
            <td>John Smith</td>
            <td>2022-01-31</td>
          </tr>
          <tr>
            <td>Document 2</td>
            <td>Jane Doe</td>
            <td>2022-01-29</td>
          </tr>
          <tr>
            <td>Document 3</td>
            <td>John Smith</td>
            <td>2022-01-28</td>
          </tr>
          <tr>
            <td>Document 4</td>
            <td>Jane Doe</td>
            <td>2022-01-25</td>
          </tr>
          <tr>
            <td>Document 5</td>
            <td>John Smith</td>
            <td>2022-01-22</td>
          </tr>
          <tr>
            <td>Document 6</td>
            <td>Jane Doe</td>
            <td>2022-01-20</td>
          </tr>
          <tr>
            <td>Document 7</td>
            <td>John Smith</td>
            <td>2022-01-18</td>
          </tr>
          <tr>
            <td>Document 8</td>
            <td>Jane Doe</td>
            <td>2022-01-15</td>
          </tr>
          <tr>
            <td>Document 9</td>
            <td>John Smith</td>
            <td>2022-01-12</td>
          </tr>
          <tr>
            <td>Document 10</td>
            <td>Jane Doe</td>
            <td>2022-01-09</td>
          </tr>
        </tbody>
        </table>
      </div>
    );
};

export default LatestDocuments;