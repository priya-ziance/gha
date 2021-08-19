import Doodle from '../../components/Doodle';

const LoginDoodle = () => {
    return (
        <Doodle rule={`
          :doodle {
            @grid: 14 / 100vmax;
          }
          :container {
            transform: scale(1.4) rotate(45deg);
          }
          overflow: hidden;
          margin: -.5px;
          border-color: @p(#51eaea, #65799B, #FF9D77, #FB3569);
          border-width: 1px;
          border-radius: 50%;
          border-style: @repeat(4, (
            @p(solid, dashed, dotted)
          ));
      
          :after, :before {
            content: '';
            @size: calc(@sqrt(2) * 50%);
            position: absolute;
            border-width: inherit;
            border-color: @p(#51eaea, #65799B, #FF9D77, #FB3569);
            border-radius: 50%;
            border-style: @repeat(4, (
              @p(solid, dashed, dotted)
            ));
          }
          :after {
            transform: rotate(@r(-180deg, 180deg));
            z-index: 0;
            background: conic-gradient(
              from @r(360deg), #E2EEF1 @r(20%, 70%), transparent 0
            );
          }
          :before {
            @size: calc(50% - 2px);
            background: #fff
              linear-gradient(
                @p(#51eaea, #E2EEF1, #FF9D77, #FB3569),
                @lp()
              )
              50% 50% / 25% 25%
              no-repeat;
            z-index: 1;
          }
          @random(.35) {
            border: none;
            :after {
              border: none;
              background: none;
            }
            :before {
              @size: @r(10%, 20%);
              border: none;
              background: @p(#0001, #51eaea, #E2EEF1, #FF9D77, #FB3569);
              @shape: @p(circle, rhombus, hexagon);
            }
          }
        `}/>
    );
};

export default LoginDoodle;