import React from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";
import { getAllTodo, getTodo, editTodo, deleteTodo } from "../utils/data-todos";
import PropTypes from "prop-types";

function HomePageWrapper({ keyword }) {
  const navigate = useNavigate();

  return <HomePage keyword={keyword} navigate={navigate} />;
}

HomePageWrapper.propTypes = {
  keyword: PropTypes.string.isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: getAllTodo(),
    };
    this.onTodoFinished = this.onTodoFinished.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteTodo(id);
    this.setState({
      todos: getAllTodo(),
    });
    // eslint-disable-next-line no-undef
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo berhasil dihapus!",
      showConfirmButton: false,
      timer: 700,
    });
  }

  onTodoFinished(id, status) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: targetTodo.title,
        description: targetTodo.description,
        is_finished: status,
      });
      this.setState({
        todos: getAllTodo(),
      });
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Berhasil mengubah status todo!`,
        showConfirmButton: false,
        timer: 700,
      });

      // Jika status diubah menjadi belum selesai, arahkan ke halaman detail
      if (status === 0) {
        this.props.navigate(`/detail/${id}`);
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <TodoList
            todos={this.state.todos}
            onDelete={this.onDeleteHandler}
            onTodoFinished={this.onTodoFinished}
            keywordSearch={this.props.keyword}
          ></TodoList>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default HomePageWrapper;

