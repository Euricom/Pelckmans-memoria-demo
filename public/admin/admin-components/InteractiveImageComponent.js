const Control = createClass({
  valueCache: new Map(),
  imageUploaded: false,
  imageUrl: '',
  pointsLength: 0,
  parentImage: false,
  componentDidMount() {
    this.setParentImage();
    if (!!this.props.value && this.props.value.has('points')) {
      Array.from(this.props.value.get('points')).forEach(point => {
        this.valueCache.set(point[0], point[1]);
      });
    }
    this.forceUpdate();
  },
  componentWillUnmount() {
    this.setParentImage();
    this.imageUrl = '';
    this.imageUploaded = false;
    this.valueCache.clear();
  },
  handleRefresh() {
    this.setParentImage();
    this.forceUpdate();
    this.props.onChange({
      image: this.imageUrl,
      points: this.valueCache
    });
  },
  handleRemoveImage() {
    this.imageUrl = '';
    this.imageUploaded = false;
    this.valueCache.clear();
    this.props.onChange({
      image: this.imageUrl,
      points: this.valueCache
    });
  },
  handlePointMetaInput(e, key) {
    const map = new Map();
    this.valueCache.get(key).forEach((v, k) => {
      map.set(k, v);
    });
    map.set('metaData', new Map().set('tooltip', e.target.value));
    this.valueCache.set(key, map);

    this.props.onChange({
      image: this.imageUrl,
      points: this.valueCache
    });
  },
  handleImageClick(e) {
    if (!e) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = `point-${this.valueCache.size}`;

    const xPercentage = `${(x / rect.width) * 100}%`;
    const yPercentage = `${(y / rect.height) * 100}%`;

    const map = this.objectToMap({ x, y, yPercentage, xPercentage });
    this.valueCache.set(key, map);

    // update cms value
    this.props.onChange({
      image: this.imageUrl,
      points: this.valueCache
    });
  },
  setPointStyles(styleObject) {
    styleObject.position = 'absolute';
    styleObject.width = '30px';
    styleObject.height = '30px';
    styleObject.display = 'block';
    styleObject.background = '#fff';
    styleObject.borderRadius = '50%';
    styleObject.transform = 'translate(-50%, -50%)';
    return styleObject;
  },
  setParentImage() {
    const parentImg = document.querySelector(`#${this.props.forID}`).parentNode.parentNode.querySelector('img');
    if (!!parentImg) {
      this.parentImage = parentImg;
      this.imageUploaded = true;
    } else {
      this.parentImage = false;
      this.imageUploaded = false;
    }
  },
  setPointPosition(styleObject, { xPercentage, yPercentage }) {
    styleObject.left = `${xPercentage}`;
    styleObject.top = `${yPercentage}`;
    return styleObject;
  },
  objectToMap(data) {
    const map = new Map();
    Object.keys(data).map(objectKey => {
      map.set(objectKey, data[objectKey]);
    });
    return map;
  },
  renderPointsMetaData() {
    const pointInputArgs = {
      className: 'iimg-points-input',
      onMouseEnter: e => {
        let key;
        if (e.target.tagName === 'INPUT') {
          key = e.target.parentNode.getAttribute('data-key');
        } else {
          key = e.target.getAttribute('data-key');
        }
        document.querySelectorAll(`span[data-key=${key}]`).forEach(element => {
          element.classList.add('hovering');
        });
      },
      onMouseLeave: () => {
        document.querySelectorAll('.hovering').forEach(element => element.classList.remove('hovering'));
      }
    };

    const iterator = () =>
      Array.from(this.valueCache.keys()).map(key => {
        const hasMetaData = !!this.valueCache.get(key).has('metaData');
        const tooltip = hasMetaData ? this.valueCache.get(key).get('metaData').get('tooltip') : '';
        return h('div', { ...pointInputArgs, 'data-key': key }, [
          h('span', {}, key),
          h('input', {
            type: 'text',
            className: this.props.classNameWrapper ?? '',
            style: {
              border: '1px solid black'
            },
            onInput: e => this.handlePointMetaInput(e, key),
            defaultValue: tooltip
          })
        ]);
      });
    return h('div', { className: 'iimg-points-input-wrapper' }, iterator());
  },
  renderImage() {
    const points = () => {
      const pointsArray = Array.from(this.valueCache.entries());
      return pointsArray.map(point => {
        const key = point[0];
        const xPercentage = point[1].xPercentage;
        const yPercentage = point[1].yPercentage;
        const styleObject = {};
        const style = {
          ...this.setPointStyles(styleObject),
          ...this.setPointPosition(styleObject, {
            xPercentage: !xPercentage ? point[1].get('xPercentage') : xPercentage,
            yPercentage: !yPercentage ? point[1].get('yPercentage') : yPercentage
          })
        };

        return h(
          'span',
          {
            'data-key': key,
            style
          },
          ''
        );
      });
    };
    return h('div', { className: 'iimg-image-wrapper' }, [
      h('div', null, [
        h('img', {
          src: this.parentImage.src,
          onClick: this.handleImageClick
        }),
        h('div', {}, points())
      ]),
      h('div', {}, [
        h('button', { onClick: () => this.handleRemoveImage() }, `Clear points`),
        h('button', { onClick: () => this.handleRefresh() }, `Refresh Image`)
      ])
    ]);
  },
  render: function () {
    return h('div', { id: this.props.forID }, [
      [this.renderImage(), this.valueCache.size !== 0 ? this.renderPointsMetaData() : null]
    ]);
  }
});

const Preview = createClass({
  mounted: false,
  imgPreview: {
    imgUrl: '',
    parentDivElement: HTMLElement,
    element: HTMLElement,
    dimensions: {
      width: 0,
      height: 0
    }
  },
  componentDidMount() {
    this.setElement();
    this.setDimensions();
    this.addPointsToPreview();
    this.mounted = true;
  },

  setElement() {
    const previewPane = document.querySelector('#preview-pane');
    this.imgPreview.element = previewPane.contentWindow.document.querySelector('img');
    if (this.imgPreview && this.imgPreview.element) {
    }
    this.imgPreview.parentDivElement = this.imgPreview.element ? this.imgPreview.element.parentNode : null;
  },
  setDimensions() {
    const { element } = this.imgPreview;
    this.imgPreview.dimensions.width = element.width;
    this.imgPreview.dimensions.height = element.height;
  },
  addPointsToPreview() {
    // get image parent div
    const imageParentDiv = this.imgPreview.element.parentElement;
    // set position relative on image parent div
    imageParentDiv.style.position = 'relative';

    // if(!!this.props.value && Array.isArray(this.props.value)){
    //   this.props.value.map()
    //   // create span points
    //   const point = document.createElement('span');
    //   // set span styling absolute
    //   this.setPointStyles(point);
    //   this.setPointPosition(point, { x: this.randomPoint.x, y: this.randomPoint.y });
    //   // add span elements with this.randomPoint properties
    //   imageParentDiv.append(point);
    // }
  },
  render: function () {
    // const { value } = this.props;
    if (this.mounted) {
      this.addPointsToPreview();
    }

    return h('p', {});
  }
});

export { Control, Preview };
