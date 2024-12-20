import {ImageResponse} from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(15 23 42)",
            padding: "50px",
          }}
        >
          {/* Header */}
          <div style={{display: "flex", alignItems: "center", marginBottom: "40px"}}>
            <img src="https://noahatkins.com/logo_gray_100.png" alt="Logo" width="60" height="60" />
          </div>

          {/* Sample Tasks */}
          <div style={{width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column"}}>
            {[
              {text: "Build an awesome todo app", complete: true, priority: true},
              {text: "Add dark mode support", complete: true, priority: false},
              {text: "Click URL to use now", complete: false, priority: true},
            ].map((task, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(148, 163, 184, 0.1)",
                  padding: "20px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  color: task.complete ? "rgb(156 163 175)" : "rgb(243 244 246)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: task.complete ? "rgb(37 99 235)" : "rgb(156 163 175)",
                    backgroundColor: task.complete ? "rgb(37 99 235)" : "transparent",
                    marginRight: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {task.complete && "✔️"}
                </div>
                <div
                  style={{
                    flex: 1,
                    textDecoration: task.complete ? "line-through" : "none",
                    fontSize: "20px",
                  }}
                >
                  {task.text}
                </div>
                {task.priority && (
                  <div
                    style={{
                      color: "rgb(234 179 8)",
                      marginLeft: "20px",
                      fontSize: "24px",
                      lineHeight: "1",
                    }}
                  >
                    ⭐
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image: ${e instanceof Error ? e.message : "Unknown error"}`, {
      status: 500,
    });
  }
}
