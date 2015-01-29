define([
  "react",

  "react-mentions"
], function(
  React,

  ReactMentions
) {

  var MentionsInput = ReactMentions.MentionsInput;
    var Mention = ReactMentions.Mention;

  var users = [
    {
      id: "johndoe",
      display: "John Doe"
    },
    {
      id: "joesmoe",
      display: "Joe Smoe"
    }
  ];

  React.createClass({
    getInitialState: function() {
      return {
        value: "Hi @[John Doe](user:johndoe), \n\nlet's add @[joe@smoe.com](email:joe@smoe.com) and @[John Doe](user:johndoe) to this conversation... ",
        valueSingleLine: "Hi @[John Doe](user:johndoe)!",
        valueAdvanced: "Hi {{johndoe}}!",
        emailsCount: 0
      };
    },

    render: function() {

      // use first/outer capture group to extract the full entered sequence to be replaced
      // and second/inner capture group to extract search string from the match
      var emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;

      return (
        <div>
          <h1>React Mentions Input</h1>

          <a href="https://github.com/effektif/react-mentions">
            <img style={{position: "absolute", top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" />
          </a>


          <h3>Multiple trigger patterns</h3>
          <p>Mention people using '@' + username or type an email address</p>

          <MentionsInput value={this.state.value} onChange={this.handleChange} markup="@[__display__](__type__:__id__)" placeholder={"Mention people using '@'"}>
            <Mention
              type="user"
              trigger="@"
              data={users}
              renderSuggestion={this.renderSuggestion}
              onAdd={this.handleAdd}
              onRemove={this.handleRemove} />
            <Mention
              type="email"
              trigger={emailRegex}
              data={this.requestEmail}
              onAdd={this.handleEmailAdd} />
          </MentionsInput>

          <h3>Single line input</h3>

          <MentionsInput singleLine={true} value={this.state.valueSingleLine} onChange={this.handleChangeSingleLine} placeholder={"Mention people using '@'"}>
            <Mention data={users}/>
          </MentionsInput>

          <h3>Advanced options</h3>

          <MentionsInput value={this.state.valueAdvanced} onChange={this.handleChangeAdvanced} markup="{{__id__}}" displayTransform={this.transformDisplay}>
            <Mention data={users} />
          </MentionsInput>



        </div>
      );
    },

    handleChange: function(ev, value) {
      this.setState({ value: value });
    },

    handleChangeSingleLine: function(ev, value) {
      this.setState({ valueSingleLine: value });
    },

    handleChangeAdvanced: function(ev, value) {
      this.setState({ valueAdvanced: value });
    },

    requestEmail: function(search) {
      return [
        { id: search, display: search }
      ];
    },

    renderSuggestion: function(id, display, search, highlightedDisplay) {
      return (
        <div className="user">
          { highlightedDisplay }
        </div>
      );
    },

    handleAdd: function() {
      console.log("added a new mention", arguments);
    },

    handleRemove: function() {
      console.log("removed a mention", arguments);
    },

    transformDisplay: function(id) {
      return "<-- " + id + " -->";
    }

    //handleEmailAdd: function(email) {
    //  this.setState({ emailsCount: this.state.emailsCount+1 });
    //}

  });
});
