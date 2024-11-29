export class LiveData {
  constructor(initialValue) {
    this._listeners = new Set();

    // 使用 Proxy 创建响应式对象
    this._value = new Proxy({ value: initialValue }, {
      set: (target, property, newValue) => {
        target[property] = newValue;
        this._notifyListeners();
        return true;
      }
    });
  }

  // 设置值
  setValue(newValue) {
    this._value.value = newValue;
  }

  // 获取值
  getValue() {
    return this._value.value;
  }

  // 添加观察者
  observe(callback) {
    this._listeners.add(callback);
    // 立即触发一次回调，类似 LiveData
    callback(this._value.value);

    // 返回取消订阅函数
    return () => this._listeners.delete(callback);
  }

  _notifyListeners() {
    for (const listener of this._listeners) {
      listener(this._value.value);
    }
  }
}