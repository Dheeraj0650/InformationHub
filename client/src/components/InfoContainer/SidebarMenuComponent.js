export default function sidebarMenuComponent(props){
  return (
    <div class="menu-data container" onClick={props.onClick}>
        <div style={{fontFamily: "'Inter', sans-serif",color: "white"}} >{props.name}</div>
        <div style={{fontFamily: "'Inter', sans-serif",color: "rgba(255,255,255,.5)",fontSize:"12px"}} >{props.info}</div>
    </div>
  );
}
