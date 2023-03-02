import { render, cleanup } from "@solidjs/testing-library";
import { setNonce, HexColorPicker } from "../src";

afterEach(cleanup);

it("Signs the `style` element with a nonce", (done) => {
  setNonce("some-hash");
  render(() => <HexColorPicker color="#F00" />);
  const styleElement = document.head.querySelector("style");
  if (styleElement === null) {
    done.fail(new Error("No style in header"));
  } else {
    expect(styleElement.getAttribute("nonce")).toBe("some-hash");
  }
  done();
});
