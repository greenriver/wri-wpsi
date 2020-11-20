class RootController < ApplicationController # rubocop:disable Metrics/ClassLength
  layout :resolve_layout
  before_action :set_partners

  if ENV['HTTP_AUTH_NAME'].present? && ENV['HTTP_AUTH_PASSWORD'].present?
    http_basic_authenticate_with(
      name: ENV['HTTP_AUTH_NAME'],
      password: ENV['HTTP_AUTH_PASSWORD'],
    )
  end

  # Index action is used to render the root "homepage" view
  # TODO: Move into views?
  def index # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    @action_items = [
      Card.new(
        title: 'Understand',
        desc: 'Data and publications',
        href: '/info/map',
      ),
      Card.new(
        title: 'Mobilise',
        desc: 'Diplomats, Defence, Development & Disaster Response',
        href: '/info/mobilise',
      ),
      Card.new(
        title: 'Learn',
        desc: 'Linking water-related challenges',
        href: '/info/learn',
      ),
      Card.new(
        title: 'Dialogue',
        desc: 'Fostering peace and collaboration',
        href: 'info/dialogue',
      ),
    ]
    @social_actions = [
      Card.new(
        title: 'Contact Us',
        href: 'info@waterpeacesecurity.org',
        options: { type: 'mail' },
      ),
      Card.new(
        title: 'Follow Us',
        href: 'http://twitter.com/WaterPeaceSec',
        options: { type: 'icon' },
      ),
      Card.new(
        title: 'Talk to Us',
        href: '//docs.google.com/forms/d/e/1FAIpQLSdXTKxcEFt0A4Zz'\
        '0zlm9KfSp1Nu7W43Ztin1j9Zdsw7d92RNw/viewform',
        options: { type: 'button' },
      ),
      Card.new(
        title: 'Know Us',
        href: '/info/about-wps',
        options: { type: 'button' },
      ),
    ]
    @tools = [
      Card.new(title: 'Global Tool', desc: '', href: '/map'),
      Card.new(title: 'Regional Tool', desc: '', href: '/info/regional-tool'),
    ]
    @quotes = [
      Card.new(
        title: 'WPS Goals',
        desc: 'Through the WPS partnership we hope to prevent conflicts over'\
        ' water by enabling communities to take action at an early stage.',
        credit: 'Carola van Rijnsoever, Dutch Ministry for Foreign Affairs.',
      ),
      Card.new(
        title: 'Crucial data',
        desc: 'Data is fundamental to understanding where the risks are highest,'\
        ' what’s driving these risks, and they suggest what possible solutions'\
        ' might be, in order to mitigate these risks.',
        credit: 'Charles Iceland, World Resources Institute',
      ),
      Card.new(
        title: 'Solving conflict',
        desc: 'It’s important to know why conflict is happening, what the role of'\
        ' water is, and what factors you can influence either as a policy maker'\
        ' in the respective region, or as an external partner, to solve the conflict',
        credit: 'Susanne Schmeier, IHE Delft',
      ),
    ]
    @news_items = NewsItem.all.order(date: :desc)

    set_pages
    set_partners
  end

  def map
    set_pages
    # Let react single page app take over
    @layers = Layer.serialized_for_react_app
    @categories = Category.serialized_for_react_app
  end

  # For showing pages with user-defined content
  def show
    set_pages
    @page = Page.find_by(slug: params[:page_slug])
    redirect_to :map if @page.nil? || @page.contentless?
  end

  def health_check
    render plain: 'OK'
  end

  def notifier_check
    raise 'test error notification'
  end

  def timeout_check
    logger.error 'entering timeout_check and burning CPU till we get killed'
    loop do
      # Spin endlessly
    end
    raise 'should never get here'
  end

  private

  def set_pages
    @pages = Page.top_level
  end

  def set_partners
    @partners = [
      Card.new(title: 'IHE', desc: '', href: '//www.un-ihe.org/'),
      Card.new(title: 'Deltares', desc: '', href: '//www.deltares.nl'),
      Card.new(title: 'Alert', desc: '', href: '//www.international-alert.org/'),
      Card.new(title: 'The Hague Centre', desc: '', href: '//hcss.nl/'),
      Card.new(title: 'Wetlands', desc: '', href: '//www.wetlands.org/'),
      Card.new(title: 'WRI', desc: '', href: '//www.wri.org/'),
    ]
  end

  def resolve_layout
    if action_name == 'map'
      'map'
    elsif action_name == 'show'
      # 'cms_pages_style' # TODO: implement new styles for the CMS pages
      'website'
    else
      'website'
    end
  end
end
