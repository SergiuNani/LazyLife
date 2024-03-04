export const renderHtmlContent = (htmlContent) => {
  return htmlContent.map((item, index) => (
    <div
      key={index}
      style={{
        fontSize: "0.7rem",
        // border: `1px solid green`,
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fonWeight: "700",
          color: "#008000",
        }}
      >
        <p>PID: {item.PID} |</p>
        <p>| Description: {item.Description} |</p>
        <p>| Data: </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {item.Data.map((el, idx) => (
          <section
            key={idx + "45"}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "700",
                color: "#FF0000",
              }}
            >
              {idx + 1}
              {"-"}
            </p>
            {el.map((mini, id) => (
              <div
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    padding: "0.2rem",
                  }}
                >
                  {mini}
                </p>
                <p style={{ color: "orange" }}> | </p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  ));
};
