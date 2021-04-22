import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "./Carousel";

import data from "./carousel.json";

// Cheatsheet for querying the react component
// https://testing-library.com/docs/react-testing-library/cheatsheet

describe("Carousel", () => {
  test("Should start on the first slide", () => {
    render(<Carousel />);
    // Assert
    expect(screen.getByText("Page one").closest("li")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
  });

  test("when the next button is clicked, go to next slide", async () => {
    render(<Carousel />);
    fireEvent.click(screen.getByText(data.actions.next));

    // Assert
    await expect(screen.getByText("Page two").closest("li")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
  });

  // describe("_goToNextPage", () => {
  // test("should increase the current active index in state by 1", () => {
  //   // Act
  //   const startIndex = 0;
  //   Carousel.prototype._goToNextPage.apply(
  //     { ...context, _state: { currIndex: startIndex } },
  //     [mockEvent]
  //   );

  //   // Assert
  //   expect(context._state.currIndex).toStrictEqual(startIndex + 1);
  // });

  //   test("should reset the current active index to 0 if the passed index is bigger then length of pages", () => {
  //     // Act
  //     const startIndex = amountOfPages;
  //     Carousel.prototype._goToNextPage.apply(
  //       { ...context, _state: { currIndex: startIndex } },
  //       [mockEvent]
  //     );

  //     // Assert
  //     expect(context._state.currIndex).toStrictEqual(0);
  //   });
  // });

  // describe("_goToPrevPage", () => {
  //   test("should decrease the current active index in state by 1", () => {
  //     // Act
  //     const startIndex = 2;
  //     Carousel.prototype._goToPrevPage.apply(
  //       { ...context, _state: { currIndex: startIndex } },
  //       [{ preventDefault: () => {} }]
  //     );

  //     // Assert
  //     expect(context._state.currIndex).toStrictEqual(startIndex - 1);
  //   });

  //   test("should reset the current active index to the last page if the passed index is lower then 0", () => {
  //     // Act
  //     const startIndex = amountOfPages;
  //     Carousel.prototype._goToNextPage.apply(
  //       { ...context, _state: { currIndex: startIndex } },
  //       [mockEvent]
  //     );

  //     // Assert
  //     expect(context._state.currIndex).toStrictEqual(0);
  //   });
  // });
});
