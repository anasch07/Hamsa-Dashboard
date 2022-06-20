import React from "react";

const SellersSalesCountStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
          <article className="card-body">
              <h5 className="card-title">Sellers Sales Count</h5>
              <iframe title="This is my Sales Statistics"
                      style={{
                          background: "#FFFFFF",
                          border: "none",
                          borderRadius: "2px",
                          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                          width: "100%",
                          height: "350px",
                      }}
                      src="https://charts.mongodb.com/charts-project-0-bnumd/embed/charts?id=62af7279-747c-4a17-8e73-57b7e1fdeafb&maxDataAge=10&theme=light&autoRefresh=true
"
              ></iframe>

          </article>

      </div>
    </div>
  );
};

export default SellersSalesCountStatistics;
