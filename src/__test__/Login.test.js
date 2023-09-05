import { render , screen, waitFor , act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe('Test Login Component',() => {
  // ボタンが1つあるかどうかのテスト
  test('render form with 1 button', async () => {
    // 画面内のDOM要素を確認するのでコンポーネントをrender
    render(<Login/>);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1)
  })

  // Eメールを失敗させるテスト
  test('should be failed on email validation',() => {
    const testEmail = 'test.com';
    // not ・・・ 間違えていることが正しい条件
    expect(validateEmail(testEmail)).not.toBe(true);
  })

  // Eメールをが正しいかどうか
  test('should be successed on email validation',() => {
    const testEmail = 'test@gmail.com';
    // not ・・・ 間違えていることが正しい条件
    expect(validateEmail(testEmail)).toBe(true);
  })

  // パスワードinputがtype passwordかどうか
  test('password input should have type password',() => {
    // 画面内のDOM要素を確認するのでコンポーネントをrender
    render(<Login/>);
    const password = screen.getByPlaceholderText('パスワード入力');
    expect(password).toHaveAttribute('type','password');
  })

  // 送信ボタンで送信できるか
  test('should be able to submit', async () => {
    render(<Login/>);
    const submitButton = screen.getByTestId('submit');
    const email = screen.getByPlaceholderText('メールアドレス入力');
    const password = screen.getByPlaceholderText('パスワード入力');

    // useStateなど状態を更新するコードはactでラップする
    act(() => {
      // 画面上のinputに'test@gmail.com'と入力する動作をおこなってくれる
      userEvent.type(email,'test@gmail.com');
      userEvent.type(password,'abcd');

      userEvent.click(submitButton);
    })

    // コンポーネントが非同期的にデータを取得・表示する場合レンダリング前にテストが実行される可能性があるため、要素が表示されるのを待つ
    await waitFor(()=> {
      // 画面上に表示されたメールアドレス
      const userInfo = screen.getByText('test@gmail.com');
      
      // 成功のメールアドレスがdocument内にあれば通信成功とする
      expect(userInfo).toBeInTheDocument();
    
    })

  })


})