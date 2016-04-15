// 自己写复选框
import React,{
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	Component,
}

export default class CheckBox extends Component{
	// 属性类型
	static propTypes = {
		text: React.PropTypes.string,
		textStyle: React.PropTypes.object,
		textAtBehind: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		onClick: React.PropTypes.func,
	};
	// 默认属性（框在前，字在后，未选中，无点击事件）
	static defaultProps = {
		text: '选项1',
		textAtBehind: true,
		checked: false,
	};
	// 点击选择框
	onClick = ()=>{
		if (this.props.onClick) {
			this.props.onClick(!this.props.checked);
		}
	};
	render(){
		// 选择框的图片
		let imgSource;
		if(this.props.checked){
			imgSource = require('');
		}
		else{
			imgSource = require('');
		}
		// 文字和可选框的位置
		var container;
		if(this.props.textAtBehind){
			container = (
				<View style={styles.container}>
				    <Image 
				        style={style.image}
				        source={imgSource}
				    />
				    <View style={styles.textView}>
				        <Text style={[this.props.textStyle,styles.text]}>{this.props.text}</Text>
				    </View>
				</View>
		    )
		}
		return(
			<TouchableHighlight
			  onPress={this.onClick}
			  style={}
			  underlayColor='#FFF'>
			  {container}
			</TouchableHighlight>
		)
	}
}

var styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image:{
		width: 25,
		height: 25,
	},
	textView:{
		alignItems: 'center',
		justifyContent: 'center',
	},
	text:{
		fontSize: 15,
	},
}) 
