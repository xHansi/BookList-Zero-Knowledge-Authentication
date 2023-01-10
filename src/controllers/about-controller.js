export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "Über BookList",
        };
        return h.view("about-view", viewData);
      },
    },
  };